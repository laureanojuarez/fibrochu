"use client";

import { useEffect, useState } from "react";
import { ProductList } from "./ProductList";
import { ProductFilter } from "./ProductFilter";
import { ProductSort } from "./ProductSort";
import { useSearchParams } from "next/navigation";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
    maxPrice: Infinity,
    searchQuery: "",
    sort: "newest", // newest, price-low, price-high
  });

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
        const response = await fetch("/api/productos");
        const data = await response.json();
        setProductos(data);
        setFilteredProductos(data);
      } catch (error) {
        console.error("Error fetching productos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
  }, []);

  // Aplica filtros cuando cambian
  useEffect(() => {
    if (!productos.length) return;

    let result = [...productos];

    // Filtrar por categoría
    if (filters.category !== "all") {
      result = result.filter((p) => p.categoria === filters.category);
    }

    // Filtrar por precio
    result = result.filter(
      (p) => p.precio >= filters.minPrice && p.precio <= filters.maxPrice
    );

    // Filtrar por búsqueda
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(query) ||
          p.descripcion.toLowerCase().includes(query)
      );
    }

    // Ordenar
    switch (filters.sort) {
      case "price-low":
        result.sort((a, b) => a.precio - b.precio);
        break;
      case "price-high":
        result.sort((a, b) => b.precio - a.precio);
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    setFilteredProductos(result);
  }, [productos, filters]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );

  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Catálogo de Productos
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar con filtros */}
          <aside className="lg:w-1/4 bg-white p-6 rounded-lg shadow-sm self-start">
            <ProductFilter
              filters={filters}
              setFilters={setFilters}
              productos={productos}
            />
          </aside>

          {/* Contenido principal */}
          <div className="lg:w-3/4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredProductos.length} producto
                {filteredProductos.length !== 1 && "s"} encontrado
                {filteredProductos.length !== 1 && "s"}
              </p>
              <ProductSort
                value={filters.sort}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, sort: value }))
                }
              />
            </div>

            <ProductList productos={filteredProductos} />
          </div>
        </div>
      </div>
    </section>
  );
}
