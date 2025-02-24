"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
  });
  const [imagen, setImagen] = useState(null);

  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data.session || error) {
        router.push("/login"); // Si no está autenticado, lo redirige
      } else {
        setUser(data.session.user);
      }
    };

    checkUser();
  }, [router]);

  if (!user) return <p>Cargando...</p>;

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
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      // Subir la imagen al bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("imagenes_productos")
        .upload(`productos/${imagen.name}`, imagen);

      if (uploadError) {
        console.error("Error al subir la imagen:", uploadError);
        return;
      }

      // Obtener la URL pública de la imagen
      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("imagenes_productos")
        .getPublicUrl(`productos/${imagen.name}`);

      if (urlError) {
        console.error("Error al obtener la URL pública:", urlError);
        return;
      }

      const imageUrl = publicUrlData.publicUrl;
      console.log("URL de la imagen:", imageUrl); // Verifica si se obtiene correctamente la URL

      // Insertar el producto con la URL de la imagen
      const { data, error } = await supabase.from("productos").insert([
        {
          nombre: producto.nombre,
          precio: parseFloat(producto.precio),
          descripcion: producto.descripcion,
          imagen_url: imageUrl, // Guardar la URL pública aquí
        },
      ]);

      if (error) {
        console.error("Error al subir producto:", error);
        alert(`Error: ${error.message}`);
      } else {
        alert("Producto subido correctamente");
        setProducto({
          nombre: "",
          precio: "",
          descripcion: "",
        });
        setImagen(null); // Resetear la imagen
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      alert("Ocurrió un error inesperado");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1>Subir Producto</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        style={{ color: "black" }}
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={producto.descripcion}
          onChange={handleChange}
        />
        {/* Input para seleccionar archivo */}
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" style={{ color: "white" }}>
          Guardar Producto
        </button>
      </form>
    </div>
  );
}
