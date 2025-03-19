"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const pathname = usePathname();

  // Cerrar el menú cuando cambia la ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, setIsMenuOpen]);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Productos" },
    { href: "/productos/metodos-de-pago", label: "Métodos de pago" },
  ];

  return (
    <>
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0  shadow-lg z-20 py-2 animate-slideDown px-2">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-6 py-2 text-lg rounded-md transition-colors ${
                    pathname === link.href
                      ? "bg-rose-400 font-medium"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <nav className="hidden md:block bg-gray-700 text-white">
        <div className="py-2">
          <ul className="flex justify-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    pathname === link.href
                      ? "bg-rose-300 font-medium"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};
