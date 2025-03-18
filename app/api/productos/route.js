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

export async function PUT(request) {
  try {
    const body = await request.json();

    const { id, nombre, descripcion, precio, stock } = body;

    console.log("Datos recibidos en API:", body);

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
      id: body.id,
      nombre: body.nombre,
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

    if (data && data[0]) {
      const safeProduct = {
        id: data[0].id,
        nombre: data[0].nombre,
        descripcion: data[0].descripcion,
        precio: data[0].precio,
        stock: data[0].stock,
        imagen_url: data[0].imagen_url,
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
    const body = await request.json();
    const { nombre, descripcion, precio, stock, imagen_url } = body;

    if (!nombre || !descripcion || !precio || !stock) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("productos")
      .insert({
        nombre,
        descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        imagen_url,
      })
      .select();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
