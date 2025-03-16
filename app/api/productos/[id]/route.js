import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Extraer el ID de la URL
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];

    if (!id) {
      return NextResponse.json(
        { error: "ID de producto requerido" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
