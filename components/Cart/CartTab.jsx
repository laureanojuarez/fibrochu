"use client";

import { useCart } from "@/context/CartContext";
import { IoIosClose } from "react-icons/io";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CartCheckout from "./CartCheckout";
import { useEffect } from "react";

const CartTab = () => {
  const { cartVisible, toggleCart, cartItems } = useCart();

  const total = cartItems.reduce((sum, item) => sum + Number(item.precio), 0);

  useEffect(() => {
    if (cartVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [cartVisible]);

  if (!cartVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-end"
      onClick={toggleCart}
    >
      <div
        className="bg-white h-full w-full max-w-md shadow-lg p-6 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold">Carrito de Compras</h2>
          <button
            onClick={toggleCart}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <IoIosClose size={28} className="text-gray-600" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-gray-500 mb-4">Tu carrito está vacío.</p>
            <button
              onClick={toggleCart}
              className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors"
            >
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mb-6 overflow-auto max-h-[calc(100vh-300px)]">
              {cartItems.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-auto">
              <CartSummary total={total} />
              <CartCheckout items={cartItems} total={total} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartTab;
