"use client";

import { addToCart } from "@/features/cartSlice";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const dispatch = useDispatch();

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
    <section className="flex flex-col items-center h-full gap-8 p-4">
      <h2 className="text-2xl p-1">Catalogo de productos</h2>
      <div className="w-full flex flex-wrap justify-center gap-4 text-gray-950">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div
              key={producto.id}
              className="border p-4 flex flex-col items-center w-[350px] cursor-pointer bg-slate-50 rounded-3xl"
            >
              <Link
                href={`/productos/${producto.id}`}
                className="w-full h-full flex flex-col items-center"
              >
                <img
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  className="w-full h-[300px] object-cover"
                />
                <h2 className="text-lg font-bold">{producto.nombre}</h2>
                <p>{producto.descripcion}</p>
              </Link>
              <div className="flex items-center justify-between w-full text-xl">
                <p className="text-green-600">${producto.precio}</p>
                <MdOutlineShoppingCart
                  onClick={() => dispatch(addToCart(producto))}
                  size={"2rem"}
                  className="bg-gray-700 text-white rounded-md p-1"
                />
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </section>
  );
}
