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
