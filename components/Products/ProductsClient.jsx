"use client";

import { useEffect, useState } from "react";
import { ProductList } from "./ProductList";
import { ProductFilter } from "./ProductFilter";
import { ProductSort } from "./ProductSort";
import { useSearchParams } from "next/navigation";
import { useProductFilters } from "@/hooks/useProductFilters";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialFilters = {
    category: "all",
    minPrice: 0,
    maxPrice: Infinity,
    searchQuery: "",
    sort: "newest",
  };

  const { filters, setFilters, filteredProductos } = useProductFilters(
    productos,
    initialFilters
  );

  useEffect(() => {
    const query = searchParams.get("q");
    setFilters((prev) => ({
      ...prev,
      searchQuery: query || "",
    }));
  }, [searchParams]);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await fetch("/api/productos", { cache: "no-store" });
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error fetching productos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Catálogo de Productos
      </h1>

      {/* Controles de filtrado y ordenamiento */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div className="text-gray-600">
            {filteredProductos.length} producto
            {filteredProductos.length !== 1 && "s"} encontrado
            {filteredProductos.length !== 1 && "s"}
          </div>

          <div className="flex gap-3 items-center">
            <ProductFilter
              filters={filters}
              setFilters={setFilters}
              productos={productos}
            />
            <ProductSort
              value={filters.sort}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, sort: value }))
              }
            />
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      <ProductList productos={filteredProductos} />
    </div>
  );
}
