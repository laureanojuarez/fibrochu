"use client";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useState } from "react";

// Inicializar MercadoPago
initMercadoPago("APP_USR-0bb9f181-1abf-4ac4-854f-fbf60fdd7e17");

export default function CarritoClient() {
  const [preferenceId, setPreferenceId] = useState(null);

  const total = cart.reduce((acc, product) => acc + Number(product.precio), 0);

  async function handleCheckout() {
    try {
      const items = cart.map((product) => ({
        title: product.nombre,
        unit_price: Number(product.precio),
        quantity: 1,
        imagen: product.imagen,
      }));

      const { data } = await axios.post("/api/create_preference", { items });
      if (data.error) throw new Error(data.error);
      setPreferenceId(data.preferenceId);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar el pago");
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Carrito de Compras ({cart.length}{" "}
          {cart.length === 1 ? "item" : "items"})
        </h2>

        {cart.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">Tu carrito está vacío.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow p-6 flex space-x-4"
                >
                  <div className="w-24 h-24 flex-shrink-0">
                    {product.imagen && (
                      <img
                        src={product.imagen}
                        alt={product.nombre}
                        className="w-full h-full object-cover rounded-md"
                      />
                    )}
                  </div>
                  <div className="flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.nombre}
                    </h3>
                    <p className="text-gray-600 flex-grow">
                      {product.descripcion}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-lg font-bold text-gray-900">
                        ${product.precio}
                      </p>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen y checkout */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Resumen del pedido
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-base text-gray-600">
                    <p>Subtotal</p>
                    <p>${total}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <p>Total</p>
                      <p>${total}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    {!preferenceId ? (
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-md transition duration-200 font-medium"
                      >
                        Proceder al pago
                      </button>
                    ) : (
                      <div className="mt-4">
                        <Wallet initialization={{ preferenceId }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
