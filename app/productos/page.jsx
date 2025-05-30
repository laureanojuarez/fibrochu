import { getProductos } from "@/components/Products/getProductos";
import ProductCard from "../../components/Products/ProductCard";

export const dynamic = "force-dynamic";
export default async function ProductsPage() {
  try {
    const productos = await getProductos();

    return (
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Nuestros Productos
        </h1>
        {productos && productos.length === 0 ? (
          <p className="text-center text-gray-500">
            No hay productos disponibles
          </p>
        ) : (
          <div className="flex flex-wrap justify-center w-full gap-4">
            {productos &&
              productos.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">
          Error al cargar productos: {error.message}
        </div>
      </div>
    );
  }
}
