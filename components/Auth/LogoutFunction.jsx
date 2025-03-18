"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // Usar cliente, no servidor

export default function LogoutFunction() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    router.refresh();
  };

  return (
    <div className="flex justify-center text-white text-sm py-2  cursor-pointer w-24">
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
