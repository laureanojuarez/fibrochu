import React from "react";
import useCartStore from "../../store/cartStore";
import { EnviarPedidoWhatsapp } from "./CheckoutButton";
import { RiCloseLine, RiDeleteBin6Line } from "@remixicon/react";

const CartTab = ({ isOpen, toggleCart }) => {
  const { cart, removeFromCart, clearCart } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  backdrop-opacity-70 backdrop-blur-md z-50 flex justify-end">
      <div
        className="w-full sm:w-80 h-full shadow-lg overflow-y-auto flex flex-col justify-between"
        style={{
          background:
            "linear-gradient(to right, rgba(26, 26, 26, 0.98), #0d0d0d)",
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <h1 className="text-xl font-bold text-foreground">
              Carrito de compras
            </h1>
            <button
              onClick={toggleCart}
              className="text-gray-light hover:text-primary transition-colors"
              aria-label="Cerrar"
            >
              <RiCloseLine size={24} />
            </button>
          </div>

          <div className="flex-grow p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-light text-center mb-2">
                  Tu carrito está vacío
                </p>
                <span className="text-primary text-3xl mb-2">♥</span>
                <p className="text-sm text-foreground">
                  Agrega algunos productos para continuar
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex p-3 rounded-lg border border-gray-800 hover:border-primary transition-colors group bg-background bg-opacity-50"
                  >
                    <div className="w-16 h-16 mr-3 overflow-hidden rounded">
                      <img
                        src={item.imagen_url}
                        alt={item.nombre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-foreground">
                        {item.nombre}
                      </h3>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-primary font-bold">
                          ${item.precio} × {item.cantidad}
                        </p>
                        <button
                          className="text-gray-light hover:text-primary transition-colors"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Eliminar producto"
                        >
                          <RiDeleteBin6Line size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-800 bg-gray-dark bg-opacity-50">
            {cart.length > 0 && (
              <>
                <EnviarPedidoWhatsapp cart={cart} />
                <button
                  className="w-full py-2 mt-2 rounded bg-background text-gray-light border border-gray-800 hover:text-primary hover:border-primary transition-colors"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTab;
