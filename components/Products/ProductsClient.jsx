"use client";

import { useEffect, useState } from "react";
import { ProductGrid } from "./ProductGrid";
import { ProductFilter } from "./ProductFilter";
import { ProductSearch } from "./ProductSearch";
import { ProductSort } from "./ProductSort";

export default function ProductsClient() {
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
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Catálogo de Productos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <ProductFilter
            filters={filters}
            setFilters={setFilters}
            productos={productos}
          />
        </div>

        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <ProductSearch
              value={filters.searchQuery}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, searchQuery: value }))
              }
            />
            <ProductSort
              value={filters.sort}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, sort: value }))
              }
            />
          </div>

          <ProductGrid productos={filteredProductos} />
        </div>
      </div>
    </div>
  );
}
