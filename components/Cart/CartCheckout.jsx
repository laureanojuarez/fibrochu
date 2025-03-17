"use client";

import { useState } from "react";
import axios from "axios";

const CartCheckout = ({ items, total }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [buyerInfo, setBuyerInfo] = useState({
    nombre: "",
    apellido: "",
    region: "",
    direccion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!buyerInfo.nombre.trim()) {
      setError("Por favor ingresa tu nombre");
      return false;
    }
    if (!buyerInfo.apellido.trim()) {
      setError("Por favor ingresa tu apellido");
      return false;
    }
    if (!buyerInfo.region.toLowerCase().includes("rosario")) {
      setError("Lo sentimos, solo realizamos envíos a Rosario, Santa Fe");
      return false;
    }
    if (!buyerInfo.direccion.trim()) {
      setError("Por favor ingresa tu dirección completa");
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setError("");
    if (!validateForm()) return;

    try {
      setLoading(true);

      // Preparar los ítems incluyendo las personalizaciones
      const checkoutItems = items.map((product) => ({
        id: product.id,
        nombre: product.nombre,
        precio: Number(product.precio),
        cantidad: 1,
        imagen_url: product.imagen_url,
        descripcion: product.customization || "Sin instrucciones especiales",
      }));

      const { data } = await axios.post("/api/create_preference", {
        items: checkoutItems,
        buyer: buyerInfo,
      });

      // Redirige a MercadoPago
      const mercadoPagoUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.preferenceId}`;
      window.location.href = mercadoPagoUrl;
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      setError(error.response?.data?.error || "Error al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            value={buyerInfo.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Apellido *
          </label>
          <input
            type="text"
            name="apellido"
            value={buyerInfo.apellido}
            onChange={handleChange}
            placeholder="Tu apellido"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Ciudad *
        </label>
        <input
          type="text"
          name="region"
          value={buyerInfo.region}
          onChange={handleChange}
          placeholder="Ingresa tu ciudad"
          className="w-full p-2 border rounded-md"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Solo realizamos envíos a Rosario, Santa Fe
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Dirección completa *
        </label>
        <input
          type="text"
          name="direccion"
          value={buyerInfo.direccion}
          onChange={handleChange}
          placeholder="Calle, número, piso, depto"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg font-medium transition-colors mt-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {loading ? "Procesando..." : "COMPRAR"}
      </button>
    </div>
  );
};

export default CartCheckout;
