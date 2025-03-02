import { supabase } from "@/utils/supabase/client";

export const addProduct = async ({
  nombre,
  descripcion,
  precio,
  imagen,
  createdAt,
}) => {
  if (!supabase) {
    await createSupabaseClient();
  }
  let imageUrl = "";

  if (imagen) {
    const file = imagen;
    const filePath = `product-photos/${Date.now()}_${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("product-photos")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error subiendo la imagen:", uploadError.message);
      throw new Error(uploadError.message);
    }

    console.log("Imagen subida correctamente:", uploadData);

    const { data: urlData } = supabase.storage
      .from("product-photos")
      .getPublicUrl(filePath);

    imageUrl = urlData.publicUrl;
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
    ])
    .select();

  if (productError) {
    console.error("Error agregando el producto:", productError.message);
    throw new Error(productError.message);
  }

  console.log("Producto agregado correctamente:", productData);
  return productData;
};
