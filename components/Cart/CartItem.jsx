"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

const CartItem = ({ item }) => {
  const { removeFromCart, updateCartItemCustomization } = useCart();
  const [customization, setCustomization] = useState(item.customization || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (customization !== item.customization) {
        updateCartItemCustomization(item.id, customization);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [customization, item, updateCartItemCustomization]);

  return (
    <div className="flex flex-col border rounded-lg overflow-hidden">
      <div className="flex p-2">
        <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
          {item.imagen_url ? (
            <img
              src={item.imagen_url}
              alt={item.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No imagen
            </div>
          )}
        </div>

        <div className="ml-3 flex-grow">
          <h3 className="font-medium text-gray-800">{item.nombre}</h3>
          <p className="text-rose-500 font-medium">
            ${Number(item.precio).toFixed(2)}
          </p>

          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">Cantidad: 1</span>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-500 hover:text-red-500 transition-colors"
              aria-label="Eliminar"
            >
              <IoTrashOutline size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Área de personalización */}
      <div className="p-2 pt-0">
        <textarea
          className="w-full p-2 border border-gray-200 rounded text-sm"
          placeholder="Instrucciones especiales para este producto..."
          rows="2"
          value={customization}
          onChange={(e) => setCustomization(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default CartItem;
