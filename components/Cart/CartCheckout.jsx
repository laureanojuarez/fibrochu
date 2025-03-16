"use client";

import { useState } from "react";
import axios from "axios";

const CartCheckout = ({ items, total }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    try {
      setLoading(true);

      const checkoutItems = items.map((product) => ({
        title: product.nombre,
        unit_price: Number(product.precio),
        quantity: 1,
        imagen: product.imagen_url,
      }));

      //   Descomenta esto cuando implementes la API de MercadoPago
      const { data } = await axios.post("/api/create_preference", {
        items: checkoutItems,
      });

      // Usa el preferenceId para construir la URL de MercadoPago
      const mercadoPagoUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.preferenceId}`;
      window.location.href = mercadoPagoUrl;
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || items.length === 0}
      className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg font-medium transition-colors mt-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      {loading ? "Procesando..." : "COMPRAR"}
    </button>
  );
};

export default CartCheckout;
