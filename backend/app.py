from flask import Flask, jsonify, request,g
from supabase.client import Client, ClientOptions
import os
from dotenv import load_dotenv
from flask_cors import CORS
from flask_storage import FlaskSessionStorage
from werkzeug.local import LocalProxy

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_ANON_KEY")

app = Flask(__name__)
CORS(app)

def get_supabase() -> Client:
    if "supabase" not in g:
        g.supabase = Client(
            url,key, options=ClientOptions(
                storage=FlaskSessionStorage(),
                flow_type="pkce"
            ),
        )
        return g.supabase
    
supabase: Client = LocalProxy(get_supabase)

# @app.route('/api/login', methods=["POST"])
# def login():
#     data = request.json
#     email = data.get("email")
#     password = data.get("password")

#     response = supabase.auth.sign_in_with_oauth(email=email, password=password)

#     if response.error:



@app.route('/api/productos', methods=["GET"])
def get_products():
    response = supabase.table('productos').select("*").execute()

    if not response.data:
        return jsonify({"message": "Not products found"}), 404

    return jsonify(response.data)

@app.route('/api/productos', methods=["POST"])
def add_product():
    data = request.json
    response = supabase.table('productos').insert(data).execute()

    if response.error:
        return jsonify({"message": response.error['message']}), 400

    return jsonify(response.data)
if __name__ =='__main__':
    app.run(debug=True)
