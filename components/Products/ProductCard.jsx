"use client";

import { RiShoppingCart2Line } from "@remixicon/react";
import useCartStore from "../../store/cartStore";

export default function ProductCard({ producto }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-gray-dark rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all flex flex-col w-42 md:w-92 h-92 border border-gray-800 hover:border-primary group">
      <div className="">
        <img
          src={producto.imagen_url}
          alt={producto.nombre}
          className="object-cover h-52 md:h-96 transform group-hover:scale-105 transition-transform duration-500 w-full"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-foreground">
          {producto.nombre}
        </h2>
        <p className="text-gray-light mb-3 text-sm">{producto.descripcion}</p>
        <div className="flex justify-between items-center">
          <p className="text-primary font-bold text-lg">${producto.precio}</p>
          <button
            className="flex items-center justify-center bg-primary hover:bg-accent text-white p-2 rounded-full w-10 h-10 transition-colors shadow-md"
            onClick={() => addToCart(producto)}
            aria-label="Añadir al carrito"
          >
            <RiShoppingCart2Line />
          </button>
        </div>
      </div>
    </div>
  );
}
