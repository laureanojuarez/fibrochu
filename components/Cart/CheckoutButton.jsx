import { RiWhatsappLine } from "@remixicon/react";

export function EnviarPedidoWhatsapp({ cart }) {
  const handleClick = (e) => {
    e.stopPropagation();

    // Número del vendedor
    const numeroVendedor = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    let mensaje =
      "Hola, estoy interesado en comprar los siguientes productos:\n\n";
    cart.forEach((item) => {
      mensaje += `- ${item.nombre} (Cantidad: ${item.cantidad || 1}) - $${
        item.precio
      }\n`;
    });

    const total = cart.reduce(
      (acc, item) => acc + item.precio * (item.cantidad || 1),
      0
    );
    mensaje += `\nTotal: $${total.toFixed(2)}`;

    const mensajeCodificado = encodeURIComponent(mensaje);

    const urlWhatsapp = `https://wa.me/${numeroVendedor}?text=${mensajeCodificado}`;
    window.open(urlWhatsapp, "_blank");
  };

  return (
    <button
      className="flex justify-center items-center gap-2   bg-green-500 w-full cursor-pointer py-2 rounded text-black hover:bg-green-100 transition-colors"
      onClick={handleClick}
    >
      <RiWhatsappLine size={"25px"} />
      Enviar pedido por WhatsApp
    </button>
  );
}
