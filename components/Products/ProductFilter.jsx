"use client";

import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

export function ProductFilter({ filters, setFilters, productos }) {
  const [categories, setCategories] = useState([]);
  const [maxPriceRange, setMaxPriceRange] = useState(1000);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

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
  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFilters = () => setIsOpen(!isOpen);

  // Contar filtros activos
  const activeFiltersCount =
    (filters.category !== "all" ? 1 : 0) +
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.maxPrice !== Infinity ? 1 : 0);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleFilters}
        className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded flex items-center gap-2 text-gray-700"
      >
        <FiFilter size={16} />
        {activeFiltersCount > 0 && (
          <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full">
            {activeFiltersCount}
          </span>
        )}
        <IoMdArrowDropdown size={16} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 bg-white border rounded-md shadow-lg z-10 w-72 max-h-[80vh] overflow-auto">
          <div className="sticky top-0 bg-white border-b flex justify-between items-center p-3">
            <h3 className="font-bold text-gray-800">Filtros</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoMdClose size={20} />
            </button>
          </div>

          <div className="p-4">
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
                    value={
                      filters.maxPrice !== Infinity ? filters.maxPrice : ""
                    }
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
              className="w-full bg-rose-400 text-white py-2 rounded-lg hover:bg-rose-400 transition-colors"
              onClick={() =>
                setFilters({
                  category: "all",
                  minPrice: 0,
                  maxPrice: Infinity,
                  searchQuery: filters.searchQuery,
                  sort: "newest",
                })
              }
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
