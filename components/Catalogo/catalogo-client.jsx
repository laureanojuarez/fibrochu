import { createClient } from "@/utils/supabase/server";

export async function CatalogoClient() {
  const supabase = await createClient();

  const { data: productos, error } = await supabase
    .from("productos")
    .select("*");

  if (!productos || productos.length === 0) {
    return (
      <p className="text-center text-white">No hay productos disponibles.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Catálogo de productos
      </h2>
      {productos.length === 0 ? (
        <p className="text-center text-white">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 max-w-7xl mx-auto px-4">
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
                <div className="mt-auto">
                  <p className="text-gray-700 text-lg font-bold mb-4">
                    ${producto.precio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
