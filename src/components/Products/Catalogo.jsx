"use client";

import { useEffect, useState } from "react";
import { fetchProductos } from "@/lib/supabase";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const getProductos = async () => {
      const data = await fetchProductos();
      setProductos(data);
    };

    getProductos();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {productos.length > 0 ? (
        productos.map((producto) => (
          <div key={producto.id} className="border p-4">
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              className="w-full h-40 object-cover"
            />
            <h2 className="text-lg font-bold">{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p className="text-green-600">${producto.precio}</p>
          </div>
        ))
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
}
