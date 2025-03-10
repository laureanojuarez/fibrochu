import { createClient } from "@/utils/supabase/server";
import { AuthButton } from "./auth-button-client";

export async function AuthButtonServer() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const safeSession = session ? JSON.parse(JSON.stringify(session)) : null;

  return <AuthButton session={safeSession} />;
}
