"use client";

import { useSession } from "../../context/SessionContext";
import { FormDashboard } from "../../components/Dashboard/FormDashboard";
import { FormEditProduct } from "../../components/Dashboard/FormEditProduct";
import { useRouter } from "next/navigation";
import { useFetchProductos } from "@/components/Products/useFetchProductos";
import { useEffect, useState } from "react";

const USER_PERMITIDO = process.env.NEXT_PUBLIC_USER_ADMIN;

export default function DashboardPage() {
  const router = useRouter();
  const { productos, loading, error } = useFetchProductos();
  const { session } = useSession();
  const [productosList, setProductosList] = useState(productos);
  const [editingProduct, setEditingProduct] = useState(null);

  // Sincronizar el estado local con los datos fetched
  useEffect(() => {
    if (productos) {
      setProductosList(productos);
    }
  }, [productos]);

  // Verificar autenticación y redireccionar si es necesario
  useEffect(() => {
    if (session === null || (session && session.user.id !== USER_PERMITIDO)) {
      router.push("/");
    }
  }, [session, router]);

  // Evitar renderizado si no hay sesión o no es usuario permitido
  if (session === undefined) {
    return <div className="container mx-auto p-4">Cargando...</div>;
  }

  if (session === null || session.user.id !== USER_PERMITIDO) {
    return null; // No renderizar nada mientras se redirecciona
  }

  // Mostrar estado de carga
  if (loading) {
    return <div className="container mx-auto p-4">Cargando productos...</div>;
  }

  // Mostrar errores
  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-500">
        Error al cargar productos: {error.message}
      </div>
    );
  }

  const handleProductAdded = (newProduct) => {
    setProductosList((prevProductos) => [...prevProductos, newProduct]);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProductosList((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === updatedProduct.id ? updatedProduct : producto
      )
    );
    setEditingProduct(null);
  };

  const handleEditClick = (producto) => {
    setEditingProduct(producto);
  };

  return (
    <div className="container mx-auto p-4">
      <FormDashboard onProductAdded={handleProductAdded} />

      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-full flex flex-col gap-4">
          <span className="text-xl font-bold">Productos Existentes</span>
          <div className="flex gap-4 flex-wrap">
            {productosList.map((producto) => (
              <div
                key={producto.id}
                className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-md w-64"
              >
                <img
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  className="w-full h-40 object-cover rounded"
                />
                <div className="flex flex-col items-center justify-center gap-2 mt-2">
                  <span className="text-lg font-semibold">
                    {producto.nombre}
                  </span>
                  <span className="text-gray-500">{producto.descripcion}</span>
                  <span className="text-green-500 font-bold">
                    ${producto.precio}
                  </span>
                  <button
                    className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => handleEditClick(producto)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <FormEditProduct
              product={editingProduct}
              onProductUpdated={handleProductUpdated}
              onCancel={() => setEditingProduct(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
