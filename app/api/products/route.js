import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  try {
    // Se obtiene el formData enviado desde el formulario
    const formData = await request.formData();
    const nombre = formData.get("nombre");
    const descripcion = formData.get("descripcion");
    const precio = parseFloat(formData.get("precio"));
    const stock = parseInt(formData.get("stock"));
    const imagen = formData.get("imagen");
    let imagen_url = null;

    const supabase = createClient();

    // Subir imagen si existe
    if (imagen && imagen.size > 0) {
      const fileExt = imagen.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `productos/${fileName}`;
      // En Node puedes pasar el objeto File como blob
      const { error: uploadError } = await supabase.storage
        .from("product-photos")
        .upload(filePath, imagen);
      if (uploadError) {
        return new Response(JSON.stringify({ error: uploadError.message }), {
          status: 500,
        });
      }
      const { data } = supabase.storage
        .from("product-photos")
        .getPublicUrl(filePath);
      imagen_url = data.publicUrl;
    }

    // Insertar producto en la tabla "productos"
    const { data, error } = await supabase
      .from("productos")
      .insert([{ nombre, descripcion, precio, stock, imagen_url }])
      .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data[0]), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
