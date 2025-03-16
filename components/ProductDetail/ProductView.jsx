// components/ProductDetail/ProductView.jsx
"use client";

import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast"; // opcional

export function ProductView({ producto, loading, error }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (producto) {
      addToCart(producto);
      toast.success("Producto añadido al carrito");
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Cargando producto...</div>;
  }

  if (error) {
    return <div className="bg-red-100 p-4 rounded text-center">{error}</div>;
  }

  if (!producto) {
    return <div className="text-center p-8">Producto no encontrado</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={producto.imagen_url || "/placeholder-image.png"}
              alt={producto.nombre}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{producto.nombre}</h1>
            <p className="text-green-600 text-2xl font-bold mb-4">
              ${Number(producto.precio).toFixed(2)}
            </p>
            <p className="text-gray-700 mb-6">{producto.descripcion}</p>
            <p className="text-sm text-gray-500 mb-6">
              Stock disponible: {producto.stock || 0}
            </p>
            <button
              onClick={handleAddToCart}
              className="w-full bg-rose-500 text-white py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors"
              disabled={!producto.stock}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
