import { RiShoppingCart2Line } from "@remixicon/react";
import useCartStore from "../../store/cartStore";

export default function ProductCard({ producto }) {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow  flex flex-col w-44 md:w-92">
      <img
        src={producto.imagen_url}
        alt={producto.nombre}
        className="object-cover h-52 md:h-96"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{producto.nombre}</h2>
        <p className="text-gray-600 mb-2">{producto.descripcion}</p>
        <div className="flex justify-between">
          <p className="text-rose-500 font-bold">${producto.precio}</p>
          <div
            className="text-rose-500 p-2 bg-rose-100 rounded-l-2xl cursor-pointer"
            onClick={() => addToCart(producto)}
          >
            <RiShoppingCart2Line />
          </div>
        </div>
      </div>
    </div>
  );
}
