import { createClient } from "@/utils/supabase/server";

export async function getProductos() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}
