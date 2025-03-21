import React from "react";

const CartTab = ({ isOpen, toggleCart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
      <h1 className="text-xl font-bold border-b p-4">Carrito de compras</h1>
      <div className="space-y-2">
        <ul>
          <li className="border-b py-2">Producto 1</li>
          <li className="border-b py-2">Producto 2</li>
          <li className="border-b py-2">Producto 3</li>
        </ul>
      </div>
      <button
        className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        onClick={toggleCart}
      >
        Cerrar
      </button>
    </div>
  );
};

export default CartTab;
