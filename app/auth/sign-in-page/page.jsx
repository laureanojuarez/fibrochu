"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/client";
import { useSession } from "../../../context/SessionContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const { session } = useSession();
  const [status, setStatus] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Iniciando session...");
    const { error } = await supabase.auth.signInWithPassword({
      email: formValues.email,
      password: formValues.password,
    });
    if (error) {
      alert(error.message);
    }
    setStatus("");
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen  gap-2">
      <Link href="/">◄ Home</Link>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Iniciar sesion
        </h2>

        <label className="block text-sm font-medium text-gray-900">Email</label>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          onChange={handleInputChange}
          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium text-gray-900">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          placeholder="contraseña"
          onChange={handleInputChange}
          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
      <Link href="/auth/sign-up-page">No tenes cuenta? Registrate</Link>
      {status && <p>{status}</p>}
    </main>
  );
}
