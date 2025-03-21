import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-center items-center space-x-4 md:space-x-8 h-10 border-b border-gray-200">
      <Link to="/" className="text-gray-800 hover:text-rose-500">
        Inicio
      </Link>
      <Link to="/productos" className="text-gray-800 hover:text-rose-500">
        Productos
      </Link>
      <Link to="/metodos-de-pago" className="text-gray-800 hover:text-rose-500">
        Métodos de pago
      </Link>
    </div>
  );
}
