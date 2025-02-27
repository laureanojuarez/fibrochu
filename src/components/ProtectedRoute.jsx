"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
        router.push("/login");
      } else if (
        !session?.user ||
        session.user.id !== "6a5676fa-4ff2-4133-aa0e-b18dbc78f843"
      ) {
        router.push("/login"); // Redirige al login si no está autorizado
      }
    };

    checkUser();
  }, [router]);

  return <>{children}</>;
}
