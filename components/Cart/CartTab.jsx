"use client";

import { useCart } from "@/context/CartContext";
import { IoIosClose } from "react-icons/io";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CartCheckout from "./CartCheckout";

const CartTab = () => {
  const { cartVisible, toggleCart, cartItems } = useCart();

  // Calcular el total de la compra
  const total = cartItems.reduce((sum, item) => sum + Number(item.precio), 0);

  return (
    <>
      {cartVisible && (
        <div className="flex flex-col absolute top-24 right-8 bg-white shadow-lg p-4 gap-4 w-86 rounded-lg border border-gray-200 z-50 min-w-[320px]">
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <h2 className="text-lg font-bold">Carrito de Compras</h2>
            <IoIosClose
              size={"2rem"}
              onClick={toggleCart}
              className="cursor-pointer hover:text-gray-600"
            />
          </div>

          {cartItems.length === 0 ? (
            <p className="py-4 text-center text-gray-500">
              Tu carrito está vacío.
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-3 overflow-auto max-h-96">
                {cartItems.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))}
              </div>

              <CartSummary total={total} />

              <CartCheckout items={cartItems} total={total} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CartTab;
