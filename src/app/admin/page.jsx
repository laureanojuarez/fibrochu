"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen_url: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !producto.nombre ||
      !producto.precio ||
      !producto.descripcion ||
      !producto.imagen_url
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const { data, error } = await supabase.from("productos").insert([
        {
          nombre: producto.nombre,
          precio: parseFloat(producto.precio), // Asegurar que el precio sea un número
          descripcion: producto.descripcion,
          imagen_url: producto.imagen_url,
        },
      ]);

      if (error) {
        console.error("Error al subir producto:", error);
        alert(`Error: ${error.message}`); // Mostrar el error real
      } else {
        alert("Producto subido correctamente");
        setProducto({
          nombre: "",
          precio: "",
          descripcion: "",
          imagen_url: "",
        });
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      alert("Ocurrió un error inesperado");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1>Subir Producto</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <input
          type="text"
          name="imagen_url"
          placeholder="URL de la imagen"
          value={producto.imagen_url}
          onChange={handleChange}
        />
        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
}
