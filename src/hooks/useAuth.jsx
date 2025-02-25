import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const ADMIN_ID = "4594c8df-8981-42dd-aed4-9b3daf4ade94";

export const useAuth = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (!isMounted) return;

        if (error || !user) {
          router.replace("/login");
        } else if (user.id !== ADMIN_ID) {
          router.replace("/");
        } else {
          setUser(user);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return { user, loading, error };
};
