import { useState } from "react";
import axios from "axios";
import useCartStore from "../../store/cartStore";
import toast from "react-hot-toast";

export function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
  });

  const [error, setError] = useState(null);
  const { cart } = useCartStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    processPayment();
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast?.error("No hay productos en el carrito");
      return;
    }
    setShowForm(true);
  };

  const processPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Usar el endpoint correcto según nuestra nueva API Route
      const response = await fetch("/api/mercadopago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          buyer: buyerInfo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al procesar el pago");
      }

      // Redirigir al usuario a la URL de pago de MercadoPago
      window.location.href = data.init_point;

      // Opcional: guardar el orderId en localStorage para referencia
      localStorage.setItem("lastOrderId", data.orderId);
    } catch (error) {
      console.error("Error al crear la preferencia de pago:", error);
      setError(error.message || "Hubo un error al procesar tu pago");
      toast?.error(error.message) || alert("Hubo un error al procesar tu pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-right font-bold">
        Total: $
        {cart
          .reduce(
            (acc, item) => acc + Number(item.precio) * (item.cantidad || 1),
            0
          )
          .toFixed(2)}
      </div>

      {!showForm ? (
        <button
          onClick={handleCheckout}
          disabled={cart.length === 0}
          className={`w-full py-2 text-white rounded-lg transition-all ${
            cart.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-rose-500 hover:bg-rose-600"
          }`}
        >
          Pagar ahora
        </button>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Información del comprador
            </h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={buyerInfo.nombre}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={buyerInfo.apellido}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={buyerInfo.direccion}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 disabled:bg-rose-300"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    "Confirmar pago"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
