"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/client";
import { useSession } from "@/context/SessionContext";
const SignUpPage = () => {
  // ==============================
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
    setStatus("Creating account...");
    const { error } = await supabase.auth.signUp({
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
      <Link className="home-link" href="/">
        ◄ Home
      </Link>
      <form
        className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-md text-black"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Registro
        </h2>

        <input
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Crear cuenta
        </button>
        <Link href="/auth/sign-in-page">Ya tenes cuenta? Logueate!</Link>
        {status && <p>{status}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
