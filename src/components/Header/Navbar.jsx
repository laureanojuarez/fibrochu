import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-center bg-white py-2">
      <Link to="/" className="text-gray-800 hover:text-rose-500 mx-4">
        Inicio
      </Link>
      <Link
        to="/productos"
        className="text-gray-800 hover:text-rose-500 text-center mx-4"
      >
        Productos
      </Link>
      <Link
        to="/metodos-de-pago"
        className="text-gray-800 hover:text-rose-500 text-center mx-4"
      >
        Métodos de pago
      </Link>
    </nav>
  );
}
