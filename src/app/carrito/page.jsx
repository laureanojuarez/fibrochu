"use client";

import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";

export default function Carrito() {
  return (
    <section className="w-full flex justify-center">
      <div className="flex items-center w-[90%] pl-4  border-b border-orange-200 h-14">
        <Link href="/">
          <IoChevronBack size={"25px"} />
        </Link>
        <span>Carrito de compras</span>
      </div>
    </section>
  );
}
