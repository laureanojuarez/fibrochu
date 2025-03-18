"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // Usar cliente, no servidor

const LogoutFunction = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    // Optionally force navigation to refresh auth state
    router.refresh();
  };

  return (
    <div className="flex justify-center bg-gray-600 text-white text-sm px-4 py-2 rounded-md cursor-pointer w-24">
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default LogoutFunction;
