import SlideProducts from "../../components/Products/SlideProducts";

function Home() {
  return (
    <main className="flex flex-col items-center gap-10">
      <section className="w-full bg-gradient-to-r from-rose-100 to-rose-200 p-2 text-center">
        <p>Envios unicamente en Rosario, Santa Fe</p>
      </section>
      <h1 className="text-3xl">Productos destacados</h1>
      <SlideProducts />

      <div className="flex flex-wrap justify-center gap-4 w-full bg-gradient-to-r from-rose-100 to-rose-200 p-2 mb-3 text-center">
        <p>♥️ ENVIOS A TODO EL PAIS!!</p>
        <p>CUOTAS</p>
        <p>TRANSFERENCIA</p>
        <p>ESCRIBINOS AL WHATSAPP</p>
      </div>
    </main>
  );
}

export default Home;
