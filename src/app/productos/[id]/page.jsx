"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const getProducto = async () => {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("id", id)
        .single(); // 🔹 Obtiene un solo producto

      if (error) {
        console.error("Error al obtener producto:", error);
        router.replace("/"); // 🔹 Redirige si no existe
      } else {
        setProducto(data);
      }
    };

    getProducto();
  }, [id, router]);

  if (!producto) return <p>Cargando...</p>;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold">{producto.nombre}</h1>
      <img
        src={producto.imagen_url}
        alt={producto.nombre}
        className="w-96 h-auto my-4"
      />
      <p className="text-lg">{producto.descripcion}</p>
      <p className="text-green-600 text-xl">${producto.precio}</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Comprar
      </button>
    </div>
  );
}
