"use client";

import Image from "next/image";
import fibrochu from "@/app/fibrochu.png";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Logout from "./Auth/Logout";
import { useCart } from "@/context/CartContext";
import { MdOutlineShoppingCart } from "react-icons/md";

const Header = () => {
  const { toggleCart } = useCart();

  return (
    <header className="flex justify-evenly items-center px-8 bg-rose-400 h-24 border-b border-gray-700">
      <Link href="/" className="flex items-center">
        <Image src={fibrochu} alt="fibrochu" width={130} />
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          href={"/login"}
          className="text-white hover:text-gray-400 transition-colors duration-300"
        >
          <FaUser size={"1.5rem"} />
        </Link>
        <div className="flex flex-col items-center">
          <Logout />
        </div>
        <button
          onClick={toggleCart}
          className="text-white hover:text-gray-400 transition-colors duration-300"
        >
          <MdOutlineShoppingCart size={"1.5rem"} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
