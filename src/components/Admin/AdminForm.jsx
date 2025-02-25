import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminForm({ onProductAdded }) {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
  });
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !producto.nombre ||
      !producto.precio ||
      !producto.descripcion ||
      !imagen
    ) {
      setMessage("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const imageUrl = await uploadImage(imagen);
      await uploadProduct({ ...producto, imagen_url: imageUrl });
      setMessage("Producto subido correctamente");
      onProductAdded();
      setProducto({ nombre: "", precio: "", descripcion: "" });
      setImagen(null);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file) => {
    const filePath = `productos/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("imagenes_productos")
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data: publicUrlData } = supabase.storage
      .from("imagenes_productos")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const uploadProduct = async (product) => {
    const { error } = await supabase.from("productos").insert([product]);

    if (error) {
      throw new Error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-md"
    >
      <input
        type="text"
        name="nombre"
        placeholder="Nombre del producto"
        value={producto.nombre}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={producto.precio}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md"
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={producto.descripcion}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="p-2 border border-gray-300 rounded-md text-gray-700"
      />
      {message && <p className="text-red-500">{message}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Subiendo..." : "Subir Producto"}
      </button>
    </form>
  );
}
