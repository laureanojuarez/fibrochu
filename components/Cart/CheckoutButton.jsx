import { useState } from "react";
import useCartStore from "../../store/cartStore";
import toast from "react-hot-toast";
import { RiLoader4Line } from "@remixicon/react";

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

      window.location.href = data.init_point;
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
      <div className="text-right font-bold text-foreground">
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
          className={`w-full py-2 text-white rounded transition-all ${
            cart.length === 0
              ? "bg-gray-800 cursor-not-allowed"
              : "bg-primary hover:bg-accent"
          }`}
        >
          Pagar ahora
        </button>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="p-6 rounded-lg w-full max-w-md border border-primary"
            style={{
              background:
                "linear-gradient(to bottom, #1a1a1a, rgba(13, 13, 13, 0.95))",
            }}
          >
            <h2 className="text-xl font-bold mb-4 text-foreground">
              Información del comprador
            </h2>
            {error && (
              <div className="mb-4 p-3 bg-background text-primary rounded border border-primary text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={buyerInfo.nombre}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-background border border-gray-800 focus:border-primary rounded text-foreground outline-none transition-colors"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={buyerInfo.apellido}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-background border border-gray-800 focus:border-primary rounded text-foreground outline-none transition-colors"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={buyerInfo.direccion}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-background border border-gray-800 focus:border-primary rounded text-foreground outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-background text-gray-light border border-gray-800 rounded hover:text-primary hover:border-primary transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-accent disabled:bg-opacity-50 transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <RiLoader4Line className="animate-spin h-5 w-5 mr-2" />
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
