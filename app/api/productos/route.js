import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function DELETE(request) {
  const { id } = await request.json();
  const supabase = await createClient();
  const { error } = await supabase.from("productos").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// Add this function after your other API methods

export async function PUT(request) {
  try {
    // Primero guarda el resultado completo en una variable
    const body = await request.json();

    // Luego desestructura los valores que necesitas
    const { id, nombre, descripcion, precio, stock } = body;

    console.log("Datos recibidos en API:", body); // Ahora body está definido

    // Convertir explícitamente a números
    const precioNum = parseFloat(precio);
    const stockNum = parseInt(stock);

    // Validar
    if (!id || !nombre || isNaN(precioNum) || isNaN(stockNum)) {
      return NextResponse.json(
        { error: "Faltan campos o son inválidos" },
        { status: 400 }
      );
    }

    console.log("Antes de actualizar en Supabase", {
      id: body.id, // Ahora body está definido
      nombre: body.nombre, // Ahora body está definido
      precio: precioNum,
      stock: stockNum,
    });

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("productos")
      .update({
        nombre,
        descripcion,
        precio: precioNum,
        stock: stockNum,
      })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json(
        { error: `Error updating product: ${error.message}` },
        { status: 500 }
      );
    }

    // Asegurarnos de que el objeto sea serializable
    if (data && data[0]) {
      // Convertimos el objeto a un objeto plano
      const safeProduct = {
        id: data[0].id,
        nombre: data[0].nombre,
        descripcion: data[0].descripcion,
        precio: data[0].precio,
        stock: data[0].stock,
        imagen_url: data[0].imagen_url,
        // Si hay más campos, agrégalos aquí...
      };
      return NextResponse.json(safeProduct);
    } else {
      return NextResponse.json({
        success: true,
        message: "Producto actualizado correctamente",
      });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: `General error: ${error.message}` },
      { status: 500 }
    );
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
