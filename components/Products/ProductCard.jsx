"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { toast } from "react-hot-toast"; // Si instalas react-hot-toast para notificaciones

export function ProductCard({ producto }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevenir navegación si se hace clic en el botón
    addToCart(producto);
    toast.success(`${producto.nombre} añadido al carrito`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/productos/${producto.id}`}>
        <div className="aspect-square relative">
          <img
            src={producto.imagen_url || "/placeholder-image.png"}
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
          {producto.stock <= 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold px-3 py-1 bg-red-600 rounded-full">
                Agotado
              </span>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 line-clamp-1">
            {producto.nombre}
          </h3>
          <p className="text-gray-700 mb-2 flex-grow line-clamp-2">
            {producto.descripcion}
          </p>
          <div className="flex items-center justify-between text-center">
            <p className="text-gray-700 text-lg font-bold">
              ${Number(producto.precio).toFixed(2)}
            </p>
            <button
              className="bg-rose-300 p-2 rounded-xl cursor-pointer hover:bg-rose-400 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={handleAddToCart}
              disabled={producto.stock <= 0}
            >
              <MdOutlineShoppingCart size="1.2rem" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
