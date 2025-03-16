"use client";

import { ProductCard } from "./ProductCard";
import { useState } from "react";

export function ProductList({ productos }) {
  // Para añadir un pequeño efecto de entrada
  const [loaded, setLoaded] = useState(false);

  setTimeout(() => setLoaded(true), 100);

  if (!productos?.length) {
    return (
      <div className="bg-white rounded-lg p-10 text-center border border-gray-200">
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          No hay productos
        </h3>
        <p className="text-gray-500">
          No encontramos productos que coincidan con tu búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap gap-6 transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
        >
          <ProductCard producto={producto} />
        </div>
      ))}
    </div>
  );
}
