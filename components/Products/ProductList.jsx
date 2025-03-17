import { ProductCard } from ".";

export function ProductList({ productos }) {
  if (!productos || productos.length === 0) {
    return (
      <div className="text-center  bg-red-600  rounded-xl shadow-sm border border-gray-100">
        <div className="mb-4 text-gray-300">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <p className="text-gray-500 font-medium">No se encontraron productos</p>
        <p className="text-gray-400 text-sm mt-1">
          Intenta con otros filtros o categorías
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        {productos?.map((producto) => (
          <div
            key={producto.id}
            className="fade-in w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <ProductCard producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
}
