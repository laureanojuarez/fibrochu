"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/admin");
      }
    };
    checkUser();
  }, [router]);

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.error("Error al iniciar sesión con GitHub:", error.message);
    } else {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/admin");
      }
    }
  };
  return (
    <div className="container mx-auto">
      <h1>Login</h1>
      <button
        onClick={handleGitHubLogin}
        className="bg-gray-800 text-white p-2 rounded"
      >
        Iniciar sesión con GitHub
      </button>
    </div>
  );
}
