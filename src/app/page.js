"use client";

import ProductList from "@/components/ProductList";
import { CartProvider } from "@/context/CartContext";

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl p-1">Catalogo de productos</h2>
      <ProductList />
    </div>
  );
}
