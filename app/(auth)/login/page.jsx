import LoginForm from "@/components/Auth/LoginForm";
import LoginGithub from "@/components/Auth/LoginGithub";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full flex mt-20 justify-center px-2">
      <section className="flex flex-col">
        <h1 className="text-3xl w-full text-center font-bold mb-6">
          Inicio de sesión
        </h1>
        <LoginForm />
        <LoginGithub />
        <div className="mt-2 flex items-center">
          <h1>{`No tienes cuenta?`}</h1>
          <Link className="font-bold ml-2" href="/register">
            Registrate
          </Link>
        </div>
        <div className="mt-2 flex items-center">
          <h1>{`Olvidaste tu contraseña?`}</h1>
          <Link className="font-bold ml-2" href="/forgot-password">
            Recupera contraseña
          </Link>
        </div>
      </section>
    </div>
  );
}
