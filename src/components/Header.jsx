import { FaUser } from "react-icons/fa";
import fibrochu_logo from "../assets/fibrochu.png";
import { IoIosMenu } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Header = ({ toggleCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className="flex w-full sticky px-4 justify-between bg-gradient-to-r from-rose-500 to-rose-400">
        <Link to="/">
          <img src={fibrochu_logo} alt="Logo de Fibrochu" className="w-32" />
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/login" className="hidden md:block">
            <FaUser size={20} />
          </Link>
          <IoMdCart
            size={20}
            cursor={"pointer"}
            onClick={toggleCart}
            className=" md:block"
          />
          <IoIosMenu
            size={24}
            cursor={"pointer"}
            onClick={toggleMenu}
            className="md:hidden"
          />
        </nav>
      </header>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 absolute top-16 right-0 w-full z-50">
          <nav className="flex flex-col space-y-4">
            <Link to="/login" onClick={toggleMenu}>
              <FaUser size={20} /> Login
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
