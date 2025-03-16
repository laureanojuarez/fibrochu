"use client";

import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export function ProductFilter({ filters, setFilters, productos }) {
  const [categories, setCategories] = useState([]);
  const [maxPriceRange, setMaxPriceRange] = useState(1000);
  const [isOpen, setIsOpen] = useState(true);

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
      setMaxPriceRange(Math.ceil(highestPrice / 100) * 100);
    }
  }, [productos]);

  // Para dispositivos móviles - mostrar/ocultar filtros
  const toggleFilters = () => setIsOpen(!isOpen);

  return (
    <div className="bg-white rounded-lg">
      <div
        className="md:hidden flex items-center justify-between p-4 cursor-pointer border-b"
        onClick={toggleFilters}
      >
        <h3 className="font-bold text-lg">Filtros</h3>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>

      <div
        className={`transition-all duration-300 ${
          isOpen
            ? "max-h-[1000px] opacity-100"
            : "max-h-0 opacity-0 md:max-h-[1000px] md:opacity-100 overflow-hidden"
        }`}
      >
        <div className="p-4">
          <h3 className="font-bold text-lg mb-6 hidden md:block">Filtros</h3>

          {/* Filtro por categoría */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-gray-700">Categoría</h4>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={filters.category === "all"}
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, category: "all" }))
                  }
                  className="accent-rose-500"
                />
                <span>Todas las categorías</span>
              </label>

              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={filters.category === cat}
                    onChange={() =>
                      setFilters((prev) => ({ ...prev, category: cat }))
                    }
                    className="accent-rose-500"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filtro por precio */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-gray-700">Precio</h4>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
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
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Max"
                  value={filters.maxPrice !== Infinity ? filters.maxPrice : ""}
                  onChange={(e) => {
                    const value = e.target.value
                      ? Number(e.target.value)
                      : Infinity;
                    setFilters((prev) => ({ ...prev, maxPrice: value }));
                  }}
                />
              </div>

              <div className="px-1">
                <input
                  type="range"
                  min="0"
                  max={maxPriceRange}
                  value={
                    filters.maxPrice === Infinity
                      ? maxPriceRange
                      : filters.maxPrice
                  }
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-rose-500"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$0</span>
                  <span>${maxPriceRange}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botón para limpiar filtros */}
          <button
            className="w-full bg-rose-400 text-white py-2 rounded-lg hover:bg-rose-500 transition-colors"
            onClick={() =>
              setFilters({
                category: "all",
                minPrice: 0,
                maxPrice: Infinity,
                searchQuery: filters.searchQuery, // Mantiene la búsqueda
                sort: "newest",
              })
            }
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
