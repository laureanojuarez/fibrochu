"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState(0);
  const [imagen, setImagen] = useState(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
      } else {
        setSession(session);
      }
      setLoading(false);
    }
    fetchSession();
  }, [router, supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Si no hay sesión, el redireccionamiento ya se está ejecutando y se retorna null
  if (!session) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("stock", stock);
    formData.append("imagen", imagen);
  };

  return (
    <section className="flex flex-col items-center w-full">
      <div className="flex items-center justify-evenly w-full">
        <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
      </div>
      <form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Nombre del Producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <textarea
          placeholder="Descripción del Producto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="file"
          onChange={(e) => setImagen(e.target.files[0])}
          accept="image/*"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button type="submit">Agregar producto</button>
      </form>
    </section>
  );
}
