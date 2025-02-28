"use client";

import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl p-1">Catalogo de productos</h2>
      <ProductList />
    </div>
  );
}
