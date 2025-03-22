import { useState } from "react";
import { supabase } from "../../supabase/client";

export const FormDashboard = ({ onProductAdded }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Supabase Storage
    const { data: imageData, error: imageError } = await supabase.storage
      .from("product-photos")
      .upload(`public/${imagen.name}`, imagen);

    if (imageError) {
      console.error("Error uploading image:", imageError);
      return;
    }

    const imagen_url = supabase.storage
      .from("product-photos")
      .getPublicUrl(imageData.path).data.publicUrl;

    // Insert product into Supabase
    const { data, error } = await supabase
      .from("productos")
      .insert([{ nombre, descripcion, precio, imagen_url }])
      .select();

    if (error) {
      console.error("Error inserting product:", error);
      return;
    }

    // Clear form
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setImagen(null);

    if (data && data.length > 0) {
      onProductAdded(data[0]);
    } else {
      // Si no hay datos devueltos, crea un objeto con los datos del formulario
      const newProduct = { nombre, descripcion, precio, imagen_url };
      onProductAdded(newProduct);
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
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Enviar
      </button>
    </form>
  );
};
