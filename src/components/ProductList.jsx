"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los productos de la tabla
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("productos")
        .select("id,nombre,descripcion,precio");

      if (error) {
        throw error;
      }

      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener los productos al cargar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Catálogo de productos</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{product.nombre}</h3>
              <p className="text-gray-700 mb-4">{product.descripcion}</p>
              <p className="text-lg font-bold">Precio: ${product.precio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
