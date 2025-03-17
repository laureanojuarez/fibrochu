"use client";

import Image from "next/image";
import fibrochu from "@/app/fibrochu.png";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LogoutFunction from "./Auth/LogoutFunction";
import { createClient } from "@/utils/supabase/client";

const Header = () => {
  const { toggleCart, cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) setSearchQuery(query);
  }, [searchParams]);

  // Verificar si hay un usuario autenticado
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkUser();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    // Si estamos en la página de productos, actualizar la URL con el parámetro de búsqueda
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-rose-400 to-rose-300 shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src={fibrochu} alt="fibrochu" width={130} priority />
          </Link>
          <div className="flex items-center gap-4 md:hidden">
            {!loading &&
              (user ? (
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">
                    Hola, {user.email?.split("@")[0]}
                  </span>
                  <LogoutFunction />
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-white hover:text-gray-100 transition-colors"
                >
                  <FaUser size={20} />
                </Link>
              ))}
            <button
              onClick={toggleCart}
              className="relative text-white hover:text-gray-100 transition-colors"
            >
              <MdOutlineShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {!loading &&
            (user ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-white">
                    Hola, {user.email?.split("@")[0]}
                  </span>
                  {user.id === process.env.NEXT_PUBLIC_ADMIN_USER_ID && (
                    <Link
                      href="/dashboard"
                      className="bg-white text-rose-500 px-3 py-1 rounded-md text-sm hover:bg-gray-100 transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  <LogoutFunction />
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="text-white hover:text-gray-100 transition-colors flex items-center gap-2"
              >
                <FaUser size={20} />
                <span>Iniciar sesión</span>
              </Link>
            ))}
          <button
            onClick={toggleCart}
            className="relative text-white hover:text-gray-100 transition-colors"
          >
            <MdOutlineShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
