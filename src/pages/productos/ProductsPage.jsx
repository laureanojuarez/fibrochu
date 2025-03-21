import ProductCard from "../../components/Products/ProductCard";
import { useFetchProductos } from "../../hooks/useFetchProducts";

export default function ProductsPage() {
  const { productos, loading, error } = useFetchProductos();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-2 py-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Nuestros Productos
      </h1>
      {productos.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay productos disponibles
        </p>
      ) : (
        <div className="flex flex-wrap  justify-center gap-4">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}
