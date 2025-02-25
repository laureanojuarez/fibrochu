import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function ProductList({ productos, onProductDeleted }) {
  const [message, setMessage] = useState("");

  const handleDelete = async (productoId, imagenUrl) => {
    try {
      // Extraer el path real del archivo desde la URL pública
      const urlParts = new URL(imagenUrl).pathname.split("/");
      const bucketName = "imagenes_productos";
      const path = urlParts.slice(6).join("/");

      if (!path) {
        setMessage("Error: No se pudo extraer el path de la imagen.");
        return;
      }

      // Eliminar imagen del bucket
      const { error: storageError } = await supabase.storage
        .from(bucketName)
        .remove([path]);

      if (storageError) {
        setMessage(`Error al eliminar imagen: ${storageError.message}`);
        return;
      }

      // Eliminar el producto de la base de datos
      const { error: deleteError } = await supabase
        .from("productos")
        .delete()
        .eq("id", productoId);

      if (deleteError) {
        setMessage(`Error al eliminar producto: ${deleteError.message}`);
      } else {
        setMessage("Producto eliminado correctamente");
        onProductDeleted(productoId);
      }
    } catch (error) {
      setMessage(`Error en la eliminación: ${error.message}`);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 h-[80%]">
      <h2 className="text-2xl font-bold mb-4">
        Lista de productos existentes en la página
      </h2>
      {message && <p className="text-red-500">{message}</p>}
      <div className="w-full flex flex-col gap-2">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div
              key={producto.id}
              className="border p-4 flex justify-between items-center gap-4"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">{producto.nombre}</h2>
                <p>{producto.descripcion}</p>
                <p className="text-green-600">${producto.precio}</p>
              </div>
              <button
                onClick={() => handleDelete(producto.id, producto.imagen_url)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                ELIMINAR
              </button>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
}
