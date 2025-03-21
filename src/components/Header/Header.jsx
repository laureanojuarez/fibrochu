import fibrochu_logo from "../../assets/fibrochu.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { RiMenuLine, RiUser3Line, RiShoppingCart2Fill } from "@remixicon/react";
import CartTab from "../Cart/CartTab";

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
      <header className="flex w-full sticky top-0 px-4 py-2 justify-between bg-gradient-to-r from-rose-500 to-rose-400 z-50">
        <Link to="/">
          <img src={fibrochu_logo} alt="Logo de Fibrochu" className="w-32" />
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="hidden md:block text-white">
            <RiUser3Line size={20} />
          </Link>
          <RiShoppingCart2Fill
            size={20}
            cursor={"pointer"}
            onClick={toggleCart}
            className="text-white"
          />
          <RiMenuLine
            size={20}
            cursor={"pointer"}
            onClick={toggleMenu}
            className="md:hidden text-white"
          />
        </div>
      </header>

      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 absolute top-full right-0 w-full z-50">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-800 hover:text-rose-500"
              onClick={toggleMenu}
            >
              Inicio
            </Link>
            <Link
              to="/productos"
              className="text-gray-800 hover:text-rose-500"
              onClick={toggleMenu}
            >
              Productos
            </Link>
            <Link
              to="/metodos-de-pago"
              className="text-gray-800 hover:text-rose-500"
              onClick={toggleMenu}
            >
              Métodos de pago
            </Link>
            <Link
              to="/login"
              className="text-gray-800 hover:text-rose-500 flex items-center gap-2"
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
