"use client";
import { useProductos } from "@/hooks/useProductos";
import AdminForm from "@/components/Admin/AdminForm";
import ProductList from "@/components/Admin/ProductList";

export default function Admin() {
  const {
    productos,
    setProductos,
    loading: productosLoading,
    error: productosError,
    refreshProductos,
  } = useProductos();

  const handleProductAdded = async () => {
    await refreshProductos();
  };

  const handleProductDeleted = (productoId) => {
    setProductos(productos.filter((p) => p.id !== productoId));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
      <AdminForm onProductAdded={handleProductAdded} />
      <ProductList
        productos={productos}
        onProductDeleted={handleProductDeleted}
      />
    </div>
  );
}
