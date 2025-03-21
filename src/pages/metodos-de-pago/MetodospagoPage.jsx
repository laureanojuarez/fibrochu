import mpLogo from "../../assets/mercadopago-logo.png";

export const metadata = {
  title: "Métodos de Pago | Fibrochu",
  description:
    "Información sobre los métodos de pago aceptados en nuestra tienda",
};

export default function MetodospagoPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Métodos de Pago
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-center mb-6">
          <img src={mpLogo} alt="MercadoPago" className="w-72" />
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Actualmente aceptamos:
        </h2>

        <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0 text-blue-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Actualmente solo aceptamos pagos a través de{" "}
                <strong>MercadoPago</strong>, lo que te permite pagar con:
              </p>
            </div>
          </div>
        </div>

        <ul className="list-disc pl-5 mb-8 space-y-2">
          <li>Tarjetas de crédito y débito a través de MercadoPago</li>
          <li>Transferencia bancaria</li>
          <li>Pago en efectivo (Rapipago, Pago Fácil, etc.)</li>
          <li>Dinero en cuenta de MercadoPago</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Próximamente:
        </h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-gray-700">
            Estamos trabajando para implementar un sistema de pago directo con
            tarjetas de crédito y débito, sin necesidad de utilizar MercadoPago
            como intermediario. ¡Pronto podrás disfrutar de esta nueva
            funcionalidad!
          </p>
        </div>

        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0 text-yellow-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Si tienes algún problema con tu pago, por favor{" "}
                <a
                  href="/contacto"
                  className="font-medium underline hover:text-yellow-800"
                >
                  contáctanos
                </a>{" "}
                y te ayudaremos lo antes posible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
