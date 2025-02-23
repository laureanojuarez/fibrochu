"use client";

import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/features/cartSlice";
import { ListCart } from "./ListCart";

export default function Carrito() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <section className="w-full flex flex-col justify-center">
      <div className="flex items-center w-[90%] pl-4  border-b border-orange-200 h-14">
        <Link href="/">
          <IoChevronBack size={"25px"} />
        </Link>
        <span>Carrito de compras</span>
      </div>
      <div>
        <h1>TUS PRODUCTOS:</h1>
        <ul className="flex gap-4 flex-col">
          {cart.map((item, index) => (
            <ListCart key={index} item={item} />
          ))}
        </ul>
        <button onClick={handleClearCart}>ELIMINAR TODO DEL CARRITO</button>
      </div>
    </section>
  );
}
