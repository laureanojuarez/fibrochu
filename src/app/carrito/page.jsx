"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Carrito() {
  const { cart, removeFromCart } = useCart();
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!user) {
      alert("Por favor, inicia sesión para continuar con el pago.");
      return;
    }

    const res = await fetch("/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: "Cuadro personalizado",
        price: 10000,
        quantity: 1,
        email: user.email, // Usuario autenticado
      }),
    });

    const data = await res.json();
    if (data.id) {
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`;
    }
  };
  return (
    <section className="container mx-auto p-4">
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
      <button onClick={handlePayment}>Proceder al pago</button>
    </section>
  );
}
