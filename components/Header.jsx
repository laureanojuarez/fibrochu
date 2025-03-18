"use client";

import Image from "next/image";
import fibrochu from "@/app/fibrochu.png";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useEffect, useState } from "react";
import LogoutFunction from "./Auth/LogoutFunction";
import { createClient } from "@/utils/supabase/client";

const Header = () => {
  const { toggleCart, cartItems } = useCart();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    const checkUser = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
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
    if (loading) return null;
    return user ? (
      <LogoutFunction />
    ) : (
      <Link
        href="/login"
        className="text-white hover:text-gray-100 transition-colors"
      >
        <FaUser size={20} />
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-rose-400 to-rose-300 shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src={fibrochu} alt="fibrochu" width={130} priority />
          </Link>
          <div className="flex items-center gap-4 md:hidden">
            {renderAuthButton()}
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
          {renderAuthButton()}
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
