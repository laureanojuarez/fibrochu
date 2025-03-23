import { supabase } from "@/supabase/client";

export async function getProductos() {
  try {
    const { data, error } = await supabase.from("productos").select("*");
    if (error) {
      console.error("Error fetching products:", error);
    }
    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
}
