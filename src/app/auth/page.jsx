"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function Auth() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const signInWithGitHub = async () => {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) throw error;
    return { user, session };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const handleSignIn = async () => {
    try {
      const { user } = await signInWithGitHub();
      setUser(user);
      router.push("/admin");
    } catch (error) {
      console.error("Error signing in with GitHub:", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In with GitHub</button>
      )}
    </div>
  );
}
