"use client";

import fibrochu_logo from "../../assets/fibrochu.png";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { RiMenuLine, RiUser3Line, RiShoppingCart2Fill } from "@remixicon/react";
import CartTab from "../Cart/CartTab";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="relative">
      <header
        className="flex w-full sticky top-0 px-4 py-2 justify-between z-50"
        style={{
          background:
            "linear-gradient(to right, #0d0d0d, rgba(255, 102, 178, 0.15), #0d0d0d)",
          borderBottom: "1px solid var(--primary)",
        }}
      >
        <Link href="/">
          <Image src={fibrochu_logo} alt="Logo de Fibrochu" className="w-32" />
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/auth/sign-in-page"
            className="hidden md:block text-foreground hover:text-primary transition-colors"
          >
            <RiUser3Line size={20} />
          </Link>
          <RiShoppingCart2Fill
            size={20}
            cursor={"pointer"}
            onClick={toggleCart}
            className="text-foreground hover:text-primary transition-colors"
          />
          <RiMenuLine
            size={20}
            cursor={"pointer"}
            onClick={toggleMenu}
            className="md:hidden text-foreground hover:text-primary transition-colors"
          />
        </div>
      </header>

      {/* Desktop Navbar */}
      <div className="hidden md:block w-full">
        <Navbar />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden shadow-lg p-4 absolute top-full right-0 w-full z-50   "
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 102, 178, 0.1), rgba(26, 26, 26, 0.95))",
            backgroundColor: "var(--background)",
          }}
        >
          <nav className="flex flex-col space-y-4 items-center ">
            <Link
              href="/"
              className="text-foreground hover:text-primary items-center transition-colors"
              onClick={toggleMenu}
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className="text-foreground hover:text-primary items-center transition-colors"
              onClick={toggleMenu}
            >
              Productos
            </Link>
            <Link
              href="/metodos-de-pago"
              className="text-foreground hover:text-primary items-center flex gap-2 justify-center transition-colors"
              onClick={toggleMenu}
            >
              Métodos de pago
            </Link>
            <Link
              href="/auth/sign-in-page"
              className="text-foreground hover:text-primary flex items-center gap-2 justify-center transition-colors"
              onClick={toggleMenu}
            >
              <RiUser3Line size={20} /> Login
            </Link>
          </nav>
        </div>
      )}

      <CartTab isOpen={isCartOpen} toggleCart={toggleCart} />
    </div>
  );
};

export default Header;
