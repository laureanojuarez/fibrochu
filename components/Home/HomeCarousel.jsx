"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { createClient } from "@/utils/supabase/client";

export default function HomeCarousel() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchProductosDestacados() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("productos")
          .select("*")
          .limit(6);

        if (error) {
          throw error;
        }

        setProductos(data);
      } catch (error) {
        console.error("Error fetching productos destacados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductosDestacados();
  }, []);

  const handleNext = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 2;
      return newIndex >= productos.length ? 0 : newIndex;
    });
  };

  const handlePrev = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex - 2;
      return newIndex < 0 ? Math.max(0, productos.length - 2) : newIndex;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (!productos || productos.length < 2) {
    return (
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Bienvenido a Fibrochu
        </h1>
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Productos Destacados
      </h2>

      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${(index / productos.length) * 100}%)`,
          }}
        >
          {productos.map((producto, i) => (
            <div
              key={producto.id || i}
              className="w-1/2 md:w-1/2 lg:w-1/2 flex-shrink-0 px-2"
            >
              <Link href={`/productos/${producto.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                  <div className="aspect-square relative">
                    <img
                      src={producto.imagen_url || "/placeholder-image.png"}
                      alt={producto.nombre || `Producto ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {producto.nombre || `Producto ${i + 1}`}
                    </h3>
                    <p className="mt-2 text-rose-500 font-bold">
                      ${Number(producto.precio || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10"
        onClick={handlePrev}
        aria-label="Anterior"
      >
        <HiOutlineChevronLeft size={24} />
      </button>
      <button
        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10"
        onClick={handleNext}
        aria-label="Siguiente"
      >
        <HiOutlineChevronRight size={24} />
      </button>
    </div>
  );
}
