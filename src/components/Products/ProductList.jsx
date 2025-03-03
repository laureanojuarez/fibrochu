"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteProduct } from "./DeleteProducts";
import { supabase } from "@/utils/supabase/client";

export default function ProductList({ isAdmin }) {
  // Obtener los productos al cargar el componente
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("productos").select("*");
        if (error) throw error;
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
      <h2 className="text-3xl font-bold mb-6 text-center ">
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
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-700"
            >
              {product.imagen && (
                <Link href={`/productos/${product.id}`}>
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                </Link>
              )}
              <h3 className="text-xl font-semibold mb-2 ">{product.nombre}</h3>
              <p>{product.descripcion}</p>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-bold ">Precio: ${product.precio}</p>
                <p>Stock: {product.stock}</p>
              </div>
              <button onClick={() => addToCart(product)}>Comprar</button>
              {isAdmin && (
                <button
                  onClick={() => handleDelete(product.id, product.imagen)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
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
