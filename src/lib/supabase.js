import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const getCurrentSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error fetching session:", error.message);
    return null;
  }
};

export const addProduct = async ({ nombre, descripcion, precio, imagen }) => {
  let imageUrl = "";
  if (imagen) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("productos")
      .upload(`public/${imagen.name}`, imagen);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { publicURL, error: urlError } = supabase.storage
      .from("productos")
      .getPublicUrl(`public/${imagen.name}`);

    if (urlError) {
      throw new Error(urlError.message);
    }

    imageUrl = publicURL;
  }

  const { data: productData, error: productError } = await supabase
    .from("productos")
    .insert([
      {
        nombre,
        descripcion,
        precio,
        imagen: imageUrl,
      },
    ]);

  if (productError) {
    throw new Error(productError.message);
  }

  return productData;
};
