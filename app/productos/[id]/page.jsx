// app/productos/[id]/page.jsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductView } from "@/components/ProductDetail";

export default function ProductoDetallePage() {
  const params = useParams();
  const id = params?.id;
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducto() {
      if (!id) {
        setError("ID de producto no válido");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/productos/${id}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        const data = await response.json();
        setProducto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducto();
  }, [id]);

  // Pasamos los estados a nuestro componente de UI
  return <ProductView producto={producto} loading={loading} error={error} />;
}
