"use client";

import { supabase } from "@/lib/supabase";

export default function Login() {
  const handleLogin = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.error("Error al iniciar sesion:", error.message);
    } else {
      console.log("Logged in as:", user);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={handleLogin}>Iniciar sesion con Github </button>
    </div>
  );
}
