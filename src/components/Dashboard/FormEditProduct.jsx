import { useState } from "react";
import { supabase } from "../../supabase/client";

export const FormEditProduct = ({ product, onProductUpdated }) => {
  const [nombre, setNombre] = useState(product.nombre);
  const [descripcion, setDescripcion] = useState(product.descripcion);
  const [precio, setPrecio] = useState(product.precio);
  const [imagen, setImagen] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imagen_url = product.imagen_url;

      if (imagen) {
        // Upload new image to Supabase Storage
        const { data: imageData, error: imageError } = await supabase.storage
          .from("product-photos")
          .upload(`public/${Date.now()}_${imagen.name}`, imagen);

        if (imageError) {
          console.error("Error uploading image:", imageError);
          return;
        }

        imagen_url = supabase.storage
          .from("product-photos")
          .getPublicUrl(imageData.path).data.publicUrl;
      }

      // Create updated product object
      const updatedProduct = {
        nombre,
        descripcion,
        precio,
        imagen_url,
        id: product.id,
      };

      // Update product in Supabase
      const { error } = await supabase
        .from("productos")
        .update({ nombre, descripcion, precio, imagen_url })
        .eq("id", product.id);

      if (error) {
        console.error("Error updating product:", error);
        return;
      }

      // Use the updated product object instead of relying on returned data
      onProductUpdated(updatedProduct);
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 border border-black rounded-lg shadow-md w-full max-w-md"
    >
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Descripcion"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="file"
        onChange={(e) => setImagen(e.target.files[0])}
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`p-2 ${
          isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white rounded`}
      >
        {isLoading ? "Actualizando..." : "Actualizar"}
      </button>
    </form>
  );
};
