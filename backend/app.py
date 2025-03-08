from flask import Flask, jsonify, request,redirect,g, session
from supabase.client import Client, ClientOptions
import os
from dotenv import load_dotenv
from flask_storage import FlaskSessionStorage
from werkzeug.local import LocalProxy
from flask_cors import CORS

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")
SECRET_KEY = os.getenv("SECRET_KEY")  # Usa una clave segura

app = Flask(__name__)
app.secret_key = SECRET_KEY

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

def get_supabase() -> Client:
    if "supabase" not in g:
        g.supabase = Client(
            SUPABASE_URL, SUPABASE_KEY, options=ClientOptions(
                storage=FlaskSessionStorage(),
                flow_type="pkce"
            ),
        )
    return g.supabase
    
supabase: Client = LocalProxy(get_supabase)

# Iniciar sesión con Github
@app.route("/signin/github")
def signin_with_github():
    res = supabase.auth.sign_in_with_oauth(
        {
            "provider": "github",
            "options": {
	            "redirect_to": f"{request.host_url}callback"
	        },
        }
    )

    if hasattr(res, "url") and res.url: 
        return jsonify({"url": res.url})
    return jsonify({"error": "No se pudo obtener la URL de autenticación"}), 400

# Callback de autenticación
@app.route("/callback")
def callback():
    code = request.args.get("code")
    next_url = request.args.get("next", "/")
    if not code:
        return jsonify({"error": "No se recibió código de autenticación"}), 400

    # Intercambiar el código por una sesión
    res = supabase.auth.exchange_code_for_session({"code": code})

    if res.get("error"):
        return jsonify({"error": res["error"]["message"]}), 400

    session["user"] = res["user"]  # Guardar datos de usuario en sesión
    return redirect(next_url)

# Obtener usuario autenticado
@app.route("/api/user" , methods=["GET"])
def get_user():
    user = session.get("user")
    if not user:
        return jsonify({"error": "No autenticado"}), 401
    return jsonify(user)

# Obtener productos
@app.route('/api/productos', methods=["GET"])
def get_products():
    response = supabase.table('productos').select("*").execute()

    if not response.data:
        return jsonify({"message": "Not products found"}), 404

    return jsonify(response.data)

# Agregar productos
@app.route('/api/productos', methods=["POST"])
def add_product():
    data = request.json
    response = supabase.table('productos').insert(data).execute()

    if response.error:
        return jsonify({"message": response.error['message']}), 400

    return jsonify(response.data)

if __name__ == '__main__':
    app.run(debug=True)
