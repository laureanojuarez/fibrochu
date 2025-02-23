"use client";

import Catalogo from "@/components/Products/Catalogo";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Productos</h1>
      <Catalogo />
    </div>
  );
}
