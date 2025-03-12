"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentFailure() {
  const searchParams = useSearchParams();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Error en el Pago
        </h1>
        <p className="text-gray-600 mb-8">
          Lo sentimos, hubo un problema al procesar tu pago. Por favor, intenta
          nuevamente.
        </p>
        <div className="space-y-4">
          <Link
            href="/carrito"
            className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Volver al Carrito
          </Link>
          <Link
            href="/"
            className="block w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
          >
            Ir al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
