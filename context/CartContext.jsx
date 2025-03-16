"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Verificar si el producto ya está en el carrito
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Si existe, solo actualizamos la cantidad
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // Si no existe, lo agregamos con cantidad 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const deleteFromCart = (product) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== product.id);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartVisible,
        toggleCart,
        cartItems,
        addToCart,
        deleteFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
