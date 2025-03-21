import React from "react";
import useCartStore from "../../store/cartStore";

const CartTab = ({ isOpen, toggleCart }) => {
  const { cart, removeFromCart, clearCart } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto flex flex-col justify-between">
      <section>
        <h1 className="text-xl font-bold border-b p-4">Carrito de compras</h1>

        {cart.length === 0 ? (
          <p className="text-center">No hay productos en el carrito</p>
        ) : (
          <div>
            <ul className="flex flex-col gap-4">
              {cart.map((item) => (
                <li key={item.id}>
                  <img src={item.id} alt="HOLA" width={50} />
                  {item.nombre} - ${item.precio} x {item.cantidad}
                  <button
                    className="ml-4 text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={clearCart}
            >
              Borrar todo
            </button>
          </div>
        )}
      </section>
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
