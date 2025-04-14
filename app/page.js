import { Carousel } from "@/components/Products/Carousel";

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="w-full bg-gray-dark border-b border-primary p-3 text-center">
        <p className="text-foreground">
          Envios unicamente en <span>Rosario, Santa Fe</span>
        </p>
      </section>

      <div className="w-full flex flex-col items-center gap-8 py-10">
        <h1 className="text-4xl font-bold relative">
          <span className="text-foreground">Productos </span>
          <span className="text-primary">Destacados</span>
          <div className="h-1 w-40 bg-gradient-to-r from-transparent via-primary to-transparent absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
        </h1>
      </div>

      <Carousel />

      <div className="w-full bg-gray-dark border-t border-primary py-4 mb-3">
        <div className="flex flex-wrap justify-center gap-8 px-4">
          <div className="flex items-center">
            <span className="text-primary mr-2">♥</span>
            <p className="text-foreground">ENVIOS SOLO EN ROSARIO</p>
          </div>
          <div className="flex items-center">
            <span className="text-primary mr-2">💳</span>
            <p className="text-foreground">CUOTAS</p>
          </div>
          <div className="flex items-center">
            <span className="text-primary mr-2">💸</span>
            <p className="text-foreground">TRANSFERENCIA</p>
          </div>
          <div className="flex items-center">
            <span className="text-primary mr-2">📱</span>
            <p className="text-foreground">ESCRIBINOS AL WHATSAPP</p>
          </div>
        </div>
      </div>
    </main>
  );
}
