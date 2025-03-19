"use client";

import Image from "next/image";
import fibrochu from "@/app/fibrochu.png";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useEffect, useState } from "react";
import LogoutFunction from "../Auth/LogoutFunction";
import { createClient } from "@/utils/supabase/client";
import { Navbar } from "./Navbar";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const { toggleCart, cartItems } = useCart();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Calcular la cantidad total de items en el carrito
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const supabase = createClient();

    const checkUser = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const renderAuthButton = () => {
    if (loading)
      return (
        <div className="w-5 h-5 rounded-full animate-pulse bg-white/50"></div>
      );

    return user ? (
      <div className="flex items-center gap-2">
        <span className="hidden md:inline text-sm font-medium">
          {user.email?.split("@")[0] || "Usuario"}
        </span>
        <LogoutFunction />
      </div>
    ) : (
      <Link
        href="/login"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-white hover:bg-white/10 transition-colors"
        aria-label="Iniciar sesión"
      >
        <FaUser size={16} />
        <span className="hidden md:inline text-sm">Iniciar sesión</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-rose-400 to-rose-300 shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center"
            aria-label="Inicio - Fibrochu"
          >
            <Image
              src={fibrochu}
              alt="Fibrochu"
              width={130}
              height={40}
              priority
              className="hover:opacity-90 transition-opacity"
            />
          </Link>

          <div className="flex items-center gap-4 md:hidden">
            {renderAuthButton()}
            <button
              onClick={toggleCart}
              className="relative text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label={`Ver carrito${
                cartItemCount > 0 ? ` (${cartItemCount} items)` : ""
              }`}
            >
              <MdOutlineShoppingCart size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </button>
            {/* Hamburger menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {renderAuthButton()}
          <button
            onClick={toggleCart}
            className="relative text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label={`Ver carrito${
              cartItemCount > 0 ? ` (${cartItemCount} items)` : ""
            }`}
          >
            <MdOutlineShoppingCart size={22} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
};

export default Header;
