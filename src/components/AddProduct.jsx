import { supabase } from "@/lib/supabase";

export const addProduct = async ({
  nombre,
  descripcion,
  precio,
  imagen,
  createdAt,
}) => {
  let imageUrl = "";
  if (imagen) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("productos")
      .upload(`fibrofacil/${imagen.name}`, imagen);

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
        createdAt,
      },
    ]);

  if (productError) {
    throw new Error(productError.message);
  }

  return productData;
};
