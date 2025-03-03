import { supabase } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { paymentId, status } = await req.json();

  if (!paymentId || !status) {
    return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
  }

  // Verificar si la orden existe
  const { data: existingOrder, error: fetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_id", paymentId)
    .single();

  if (fetchError) {
    console.error("Error al buscar la orden:", fetchError);
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!existingOrder) {
    console.error("Orden no encontrada para el payment_id:", paymentId);
    return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("payment_id", paymentId)
    .select("*")
    .single();

  if (error) {
    console.error("Error al actualizar la orden:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Orden actualizada", data });
}
