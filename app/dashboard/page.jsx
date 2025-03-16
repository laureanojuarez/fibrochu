import { getProductos } from "@/components/getProductos";
import DashboardForm from "./DashboardForm";

function ProductList({ productos }) {
  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Productos Existentes</h2>
      {productos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gray-100 relative">
                {producto.imagen_url ? (
                  <img
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-800">{producto.nombre}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {producto.descripcion}
                </p>
                <div className="mt-2 flex justify-between">
                  <span className="text-blue-600 font-semibold">
                    ${producto.precio}
                  </span>
                  <span className="text-gray-500">Stock: {producto.stock}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No hay productos agregados. ¡Agrega tu primer producto!
        </div>
      )}
    </div>
  );
}

export default async function DashboardPage() {
  const productos = await getProductos();

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Panel de Administración
        </h1>
        {/* Si se maneja la sesión desde el servidor se podría agregar aquí la info del usuario */}
        <span className="text-sm text-gray-600">Usuario</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario para agregar productos */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Producto</h2>
          <DashboardForm />
        </div>

        {/* Lista de productos */}
        <ProductList productos={productos} />
      </div>
    </div>
  );
}
