import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="flex justify-center py-3 border-b border-gray-800"
      style={{
        background:
          "linear-gradient(to right, rgba(26, 26, 26, 1), rgba(26, 26, 26, 0.9), rgba(26, 26, 26, 1))",
      }}
    >
      <Link
        href="/"
        className="text-foreground hover:text-primary mx-4 transition-colors relative group"
      >
        <span>Inicio</span>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
      </Link>
      <Link
        href="/productos"
        className="text-foreground hover:text-primary text-center mx-4 transition-colors relative group"
      >
        <span>Productos</span>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
      </Link>
      <Link
        href="/metodos-de-pago"
        className="text-foreground hover:text-primary text-center mx-4 transition-colors relative group"
      >
        <span>Métodos de pago</span>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
      </Link>
    </nav>
  );
}
