import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error getting user", userError.message);
        return NextResponse.redirect(`${origin}/error`);
      }

      const { data: existingUser } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("email", data?.user?.email)
        .limit(1)
        .single();

      if (!existingUser) {
        const { error: dbError } = await supabase.from("user_profiles").insert({
          email: data?.user.email,
          username: data?.user?.user_metadata?.user_name,
        });

        if (dbError) {
          console.error("Error inserting user", dbError.message);
          return NextResponse.redirect(`${origin}/error`);
        }
      }

      const redirectUrl = `${process.env.NEXT_PUBLIC_DOMAIN}${next}`;
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
