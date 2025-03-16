"use client";

import { useEffect, useState } from "react";

export function ProductFilter({ filters, setFilters, productos }) {
  const [categories, setCategories] = useState([]);
  const [maxPriceRange, setMaxPriceRange] = useState(1000);

  useEffect(() => {
    if (productos?.length) {
      // Extraer categorías únicas
      const uniqueCategories = [
        ...new Set(productos.map((p) => p.categoria)),
      ].filter(Boolean);
      setCategories(uniqueCategories);

      // Determinar precio máximo
      const highestPrice = Math.max(
        ...productos.map((p) => Number(p.precio) || 0)
      );
      setMaxPriceRange(Math.ceil(highestPrice / 100) * 100); // Redondear hacia arriba al 100 más cercano
    }
  }, [productos]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-xl mb-4">Filtros</h3>

      {/* Filtro por categoría */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Categoría</h4>
        <select
          className="w-full p-2 border rounded"
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option value="all">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro por precio */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Precio</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minPrice: Number(e.target.value) || 0,
              }))
            }
          />
          <span>-</span>
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Max"
            value={filters.maxPrice !== Infinity ? filters.maxPrice : ""}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : Infinity;
              setFilters((prev) => ({ ...prev, maxPrice: value }));
            }}
          />
        </div>
      </div>

      {/* Botón para limpiar filtros */}
      <button
        className="w-full bg-rose-400 text-white py-2 rounded hover:bg-rose-500 transition-colors"
        onClick={() =>
          setFilters({
            category: "all",
            minPrice: 0,
            maxPrice: Infinity,
            searchQuery: "",
            sort: "newest",
          })
        }
      >
        Limpiar filtros
      </button>
    </div>
  );
}
