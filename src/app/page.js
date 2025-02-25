"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getProductos = async () => {
      const { data, error } = await supabase.from("productos").select("*");
      if (error) {
        console.error("Error al obtener productos:", error);
      } else {
        setProductos(data);
      }
    };
    getProductos();
  }, []);

  return (
    <section className="flex flex-col justify-center items-center h-full gap-8">
      <h2 className="text-2xl p-1">Catalogo de productos</h2>
      <div className="w-full flex flex-wrap justify-center gap-4">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div
              key={producto.id}
              className="border p-4 flex flex-col items-center w-[350px] cursor-pointer"
              onClick={() => router.push(`/productos/${producto.id}`)}
            >
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                className="w-full h-[300px] object-cover"
              />
              <h2 className="text-lg font-bold">{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <p className="text-green-600">${producto.precio}</p>
              <button className=" ">Comprar</button>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </section>
  );
}
