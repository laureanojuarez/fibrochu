"use client";

import { fetchProducts } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProducts(id);
        setProducto(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold">{producto.nombre}</h1>
      <img
        src={producto.imagen}
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
