"use client";

import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useCart } from "./useCart";

export default function Carrito() {
  const { cart, handleClearCart, handleRemoveFromCart } = useCart();

  const handleCheckout = () => {
    console.log("Checkout");
  };

  return (
    <section className="flex flex-col items-center w-full ">
      <div className="flex items-center w-full border-b border-orange-200 h-14 mb-4">
        <Link href="/">
          <IoChevronBack size={"25px"} />
        </Link>
        <span className="ml-4 text-xl">Carrito de compras</span>
      </div>
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold ">TUS PRODUCTOS:</h1>
        {cart.length > 0 ? (
          <div className="flex flex-col gap-2 ">
            {cart.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between border p-2 rounded-md"
              >
                <div>
                  <h2 className="text-lg font-bold">{product.nombre}</h2>
                  <p className="text-sm">{product.descripcion}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg">${product.precio}</p>
                  <button
                    onClick={() => handleRemoveFromCart(index)}
                    className="text-red-500"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={handleClearCart}
              className="mt-4 p-2 bg-red-600 text-white rounded-md"
            >
              ELIMINAR TODO DEL CARRITO
            </button>
            <button
              onClick={handleCheckout}
              className="mt-4 p-2 bg-blue-600 text-white rounded-md"
            >
              Comprar
            </button>
          </div>
        ) : (
          <p>No hay productos en el carrito.</p>
        )}
      </div>
    </section>
  );
}
