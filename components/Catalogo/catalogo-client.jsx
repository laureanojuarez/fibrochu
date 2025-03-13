import { MdOutlineShoppingCart } from "react-icons/md";
import { getProductos } from "../getProducts";

export async function CatalogoClient() {
  const productos = await getProductos();

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold text-center">Catálogo de productos</h2>
      {productos.length === 0 ? (
        <p className="text-center text-white">No hay productos disponibles.</p>
      ) : (
        <div className="flex gap-4 flex-wrap p-4">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto w-full max-w-[280px] flex flex-col"
            >
              <div className="aspect-square relative">
                <img
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{producto.nombre}</h3>
                <p className="text-gray-700 mb-2 flex-grow">
                  {producto.descripcion}
                </p>
                <div className="flex items-center justify-between text-center">
                  <p className="text-gray-700 text-lg font-bold ">
                    ${producto.precio}
                  </p>
                  <div className="bg-rose-300 p-2 rounded-xl">
                    <MdOutlineShoppingCart className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
