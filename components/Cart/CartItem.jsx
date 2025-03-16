"use client";

import { useCart } from "@/context/CartContext";
import { AiTwotoneDelete } from "react-icons/ai";

const CartItem = ({ item }) => {
  const { deleteFromCart } = useCart();

  return (
    <div className="flex gap-3 border-b border-gray-200 p-2 pb-3">
      <img
        src={item.imagen_url}
        alt={item.nombre}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between w-full items-center">
          <p className="font-medium text-gray-800 truncate max-w-[180px]">
            {item.nombre}
          </p>
          <button
            onClick={() => deleteFromCart(item)}
            className="text-red-500 hover:text-red-700"
            aria-label="Eliminar producto"
          >
            <AiTwotoneDelete size={"1.3rem"} />
          </button>
        </div>
        <div className="flex justify-between w-full text-sm">
          <p className="text-gray-600">
            {item.stock > 0 ? `Stock: ${item.stock}` : "Sin stock"}
          </p>
          <p className="font-bold">${Number(item.precio).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
