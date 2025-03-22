import { Navigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import { useState } from "react";
import { FormDashboard } from "../../components/Dashboard/FormDashboard";
import { useFetchProductos } from "../../components/Products/getProductos";
import { FormEditProduct } from "../../components/Dashboard/FormEditProduct";
import { useEffect } from "react";

const USER_PERMITIDO = "8f1f6259-5b28-425e-bab2-49b96bf5b9b5";

export default function DashboardPage() {
  const { session } = useSession();
  const { productos, loading, error } = useFetchProductos();
  const [productosList, setProductosList] = useState(productos);
  const [editingProduct, setEditingProduct] = useState(null);

  if (!session || session.user.id !== USER_PERMITIDO) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    setProductosList(productos);
  }, [productos]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
        <FormEditProduct
          product={editingProduct}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </div>
  );
}
