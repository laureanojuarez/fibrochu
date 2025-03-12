"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function PaymentSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Limpiar el carrito después de un pago exitoso
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Pago Exitoso!
        </h1>
        <p className="text-gray-600 mb-8">
          Tu pago ha sido procesado correctamente. Gracias por tu compra.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Volver al Inicio
          </Link>
          <Link
            href="/productos"
            className="block w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
          >
            Seguir Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
