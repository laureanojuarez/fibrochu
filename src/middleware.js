import { NextResponse } from "next/server";
import { supabase } from "./utils/supabase/client";

export async function middleware(req) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*"],
};
