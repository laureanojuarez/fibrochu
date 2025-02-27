"use client";

import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <section className="flex flex-col items-center h-full gap-8 p-4">
      <h2 className="text-2xl p-1">Catalogo de productos</h2>
      <div className="w-full flex flex-wrap justify-center gap-4 text-gray-950">
        <ProductList />
      </div>
    </section>
  );
}
