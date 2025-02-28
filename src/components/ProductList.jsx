"use client";

import { deleteProduct, fetchProducts } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function ProductList({ isAdmin }) {
  // Obtener los productos al cargar el componente
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleDelete = async (id, imageUrl) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await deleteProduct(id, imageUrl);
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error("Error al eliminar el producto:", error.message);
        alert("Error al eliminar el producto");
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Catálogo de productos
      </h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay productos disponibles.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {product.imagen && (
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{product.nombre}</h3>
              <p className="text-gray-700 mb-4">{product.descripcion}</p>
              <p className="text-lg font-bold">Precio: ${product.precio}</p>
              {isAdmin && (
                <button
                  onClick={() => handleDelete(product.id, product.imagen)}
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
