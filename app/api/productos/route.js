import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Se obtiene el formData enviado desde el formulario
    const formData = await request.formData();
    const nombre = formData.get("nombre");
    const descripcion = formData.get("descripcion") || ""; // Valor por defecto si es null
    const precio = parseFloat(formData.get("precio"));
    const stock = parseInt(formData.get("stock"));
    const imagen = formData.get("imagen");
    let imagen_url = null;

    // Importante: esperar a que se cree el cliente
    const supabase = await createClient();

    // Validaciones básicas
    if (!nombre || isNaN(precio) || isNaN(stock)) {
      return NextResponse.json(
        { error: "Faltan datos requeridos o son inválidos" },
        { status: 400 }
      );
    }

    // Subir imagen si existe
    if (imagen && imagen.size > 0) {
      try {
        const fileExt = imagen.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `productos/${fileName}`;

        // En Node puedes pasar el objeto File directamente
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("product-photos")
          .upload(filePath, imagen);

        if (uploadError) {
          console.error("Error al subir imagen:", uploadError);
          return NextResponse.json(
            { error: `Error al subir imagen: ${uploadError.message}` },
            { status: 500 }
          );
        }

        // Obtener URL pública
        const { data } = supabase.storage
          .from("product-photos")
          .getPublicUrl(filePath);

        imagen_url = data.publicUrl;
      } catch (imageError) {
        console.error("Error procesando imagen:", imageError);
        return NextResponse.json(
          { error: `Error procesando imagen: ${imageError.message}` },
          { status: 500 }
        );
      }
    }

    // Insertar producto en la tabla "productos"
    const { data, error } = await supabase
      .from("productos")
      .insert([
        {
          nombre,
          descripcion,
          precio,
          stock,
          imagen_url,
          created_at: new Date().toISOString(), // Asegurar que se establezca la fecha
        },
      ])
      .select();

    if (error) {
      console.error("Error al insertar producto:", error);
      return NextResponse.json(
        { error: `Error al insertar producto: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Error general:", error);
    return NextResponse.json(
      { error: `Error general: ${error.message}` },
      { status: 500 }
    );
  }
}
