import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;

    // Verificar acceso al dashboard - solo para un usuario específico
    if (pathname.startsWith("/dashboard")) {
      if (!user) {
        // No hay usuario, redirigir a login
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }

      const ADMIN_ID = process.env.ADMIN_USER_ID;

      if (user.id !== ADMIN_ID) {
        // Usuario no autorizado para el dashboard
        console.log("IDs no coinciden, acceso denegado");
        const url = request.nextUrl.clone();
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }

      console.log("Acceso autorizado al dashboard");
      return response;
    }

    const isPublicRoute =
      pathname === "/" || // Ruta principal
      pathname.includes("/login") ||
      pathname.includes("/register") ||
      pathname.includes("/forgot-password") ||
      pathname.includes("/reset-password") ||
      pathname.startsWith("/auth") ||
      pathname.startsWith("/productos") ||
      pathname.startsWith("/api/") ||
      pathname.includes("/_next") ||
      pathname.includes("/favicon") ||
      pathname.includes("/metodos-de-pago");

    if (!user && !isPublicRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    return response;
  } catch (e) {
    console.error("Middleware error:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}
