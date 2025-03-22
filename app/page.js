import SlideProducts from "@/components/Products/SlideProducts";

export default function Home() {
  return (
    <main className="flex flex-col justify-evenly h-full">
      <section className="w-full bg-gradient-to-r from-rose-100 to-rose-200 p-2 text-center">
        <p>Envios unicamente en Rosario, Santa Fe</p>
      </section>

      <div className="w-full flex flex-col items-center gap-4">
        <h1 className="text-3xl">Productos destacados</h1>
        <SlideProducts />
      </div>

      <div className="flex flex-wrap justify-center gap-4 w-full bg-gradient-to-r from-rose-100 to-rose-200 p-2 mb-3 text-center">
        <p>♥️ ENVIOS SOLO EN ROSARIO!!</p>
        <p>CUOTAS</p>
        <p>TRANSFERENCIA</p>
        <p>ESCRIBINOS AL WHATSAPP</p>
      </div>
    </main>
  );
}
