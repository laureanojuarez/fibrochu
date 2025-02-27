"use client";

import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function Home() {
  return (
    <section className="flex flex-col items-center h-full gap-8 p-4">
      <h2 className="text-2xl p-1">Catalogo de productos</h2>
      <div className="w-full flex flex-wrap justify-center gap-4 text-gray-950">
        {/* <div key={product.id}>
          <h2>{product.nombre}</h2>
          <p>{product.descripcion}</p>
          <p>Stock disponible: {product.stock}</p>
        </div> */}
      </div>
    </section>
  );
}
