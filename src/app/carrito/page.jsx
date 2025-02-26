"use client";

import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";

export default function Carrito() {
  const cart = useSelector((state) => state.cart);

  console.log(cart);

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
            {cart.map((item, index) => (
              <ListCart key={index} index={index} item={item} />
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
            />
          </div>
        ) : (
          <p>No hay productos en el carrito.</p>
        )}
      </div>
    </section>
  );
}
