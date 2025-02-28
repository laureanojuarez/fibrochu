import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para obtener los productos de la tabla

export const fetchProducts = async () => {
  const { data, error } = await supabase.from("productos").select("*");

  if (error) {
    throw error;
  }

  return data;
};

export const addProduct = async ({
  nombre,
  descripcion,
  precio,
  imagen,
  createdAt,
}) => {
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

export const deleteProduct = async (id, imageUrl) => {
  try {
    console.log("Iniciando eliminación del producto con ID:", id);

    // Eliminar la imagen del bucket si existe
    if (
      imageUrl &&
      imageUrl.includes("supabase.co/storage/v1/object/public/product-photos/")
    ) {
      console.log("Eliminando imagen:", imageUrl);

      const url = new URL(imageUrl);
      // Extrae la ruta completa dentro del bucket (después de "public/product-photos/")
      const filePath = url.pathname.split("public/product-photos/")[1];
      console.log("FilePath extraído:", filePath);

      if (!filePath) {
        throw new Error(
          "No se pudo extraer el filePath de la URL de la imagen."
        );
      }

      const { error: deleteImageError } = await supabase.storage
        .from("product-photos")
        .remove([filePath]);

      if (deleteImageError) {
        console.error("Error eliminando la imagen:", deleteImageError.message);
        throw new Error(
          `Error eliminando la imagen: ${deleteImageError.message}`
        );
      }

      console.log("Imagen eliminada correctamente:", filePath);
    } else {
      console.log("No se encontró una imagen válida para eliminar.");
    }

    // Eliminar producto de la tabla
    console.log("Eliminando producto de la tabla con ID:", id);
    const { error } = await supabase.from("productos").delete().eq("id", id);

    if (error) {
      console.error("Error eliminando el producto:", error.message);
      throw new Error(`Error eliminando el producto: ${error.message}`);
    }

    console.log("Producto eliminado correctamente.");
  } catch (error) {
    console.error("Error en deleteProduct:", error.message);
    throw new Error(`Error en deleteProduct: ${error.message}`);
  }
};
