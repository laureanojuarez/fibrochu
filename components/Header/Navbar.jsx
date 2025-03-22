import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-center bg-white py-2">
      <Link href="/" className="text-gray-800 hover:text-rose-500 mx-4">
        Inicio
      </Link>
      <Link
        href="/productos"
        className="text-gray-800 hover:text-rose-500 text-center mx-4"
      >
        Productos
      </Link>
      <Link
        href="/metodos-de-pago"
        className="text-gray-800 hover:text-rose-500 text-center mx-4"
      >
        Métodos de pago
      </Link>
    </nav>
  );
}
