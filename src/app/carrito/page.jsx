"use client";

import { useCart } from "@/context/CartContext";
import axios from "axios";

export default function Carrito() {
  const { cart, removeFromCart } = useCart();

  async function handleCheckout() {
    const { data } = await axios.post(
      "http://localhost:3000/api/create_preference",
      {
        items: cart.map((product) => ({
          title: product.nombre,
          description: product.descripcion,
          unit_price: product.precio,
          quantity: 1,
        })),
      }
    );

    window.location.href = data.init_point;
  }

  return (
    <section className="flex flex-col  container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Carrito de Compras
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cart.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {product.imagen && (
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{product.nombre}</h3>
              <p className="text-gray-700 mb-4">{product.descripcion}</p>
              <p className="text-lg font-bold">Precio: ${product.precio}</p>
              <button
                onClick={() => removeFromCart(product.id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
              >
                Eliminar del Carrito
              </button>
            </div>
          ))}
        </div>
      )}

      <button onClick={handleCheckout}>Pagar con mercadopago</button>
    </section>
  );
}
