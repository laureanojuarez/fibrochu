import { AuthButtonServer } from "@/components/auth-button-server";
import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <section className=" flex items-center justify-center bg-gradient-to-r ">
      <div className="bg-white rounded-xl shadow-xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Iniciar Sesión
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              formAction={login}
              className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Iniciar Sesión
            </button>
            <button
              type="submit"
              formAction={signup}
              className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Registrarse
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 mt-6">O inicia sesión con</p>
        <div className="mt-4">
          <AuthButtonServer />
        </div>
      </div>
    </section>
  );
}
