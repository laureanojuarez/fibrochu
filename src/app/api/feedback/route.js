import { NextResponse } from "next/server";
import { supabase } from "../../../utils/supabase/server";

export async function POST(req) {
  const { paymentId, status } = await req.json();

  if (!paymentId || !status) {
    return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("payment_id", paymentId);

  if (error) {
    console.error("Error al actualizar la orden:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Orden actualizada", data });
}
