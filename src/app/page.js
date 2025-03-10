"use client";
import { useCart } from "@/context/CartContext";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Home() {
  const supabase = createClient();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase.from("productos").select("*");
      if (error) {
        console.error("Error fetching productos:", error);
      } else {
        setProductos(data);
      }
      setLoading(false);
    };

    fetchProductos();
  }, [supabase]);

  if (loading) {
    return <p className="text-center text-white">Cargando productos...</p>;
  }

  if (loading) {
    return <p className="text-center text-white">Cargando productos...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center ">
        Catálogo de productos
      </h2>
      {productos.length === 0 ? (
        <p className="text-center text-white">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{producto.nombre}</h3>
                <p className="text-gray-700 mb-2">{producto.descripcion}</p>
                <p className="text-gray-700 text-lg font-bold">
                  ${producto.precio}
                </p>
                <button
                  onClick={() => addToCart(producto)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
