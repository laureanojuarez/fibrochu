"use client";

import { createClient } from "@/utils/supabase/server";
import { useEffect, useState } from "react";

export default function ClientComponent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data, error } = (await supabase).auth.getUser();
      if (error || !data?.user) {
        console.log("El usuario no existe");
      } else {
        setUser(data?.user);
      }
    }
    getUser();
  }, []);

  return <h2>{user?.email}</h2>;
}
