import { useState, useEffect } from "react";

export const useProductFilters = (productos, initialFilters) => {
  const [filters, setFilters] = useState(initialFilters);
  const [filteredProductos, setFilteredProductos] = useState([]);

  useEffect(() => {
    if (!productos) {
      setFilteredProductos([]);
      return;
    }

    let result = [...productos];

    if (filters.category !== "all") {
      result = result.filter((p) => p.categoria === filters.category);
    }

    result = result.filter(
      (p) => p.precio >= filters.minPrice && p.precio <= filters.maxPrice
    );

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(query) ||
          p.descripcion.toLowerCase().includes(query)
      );
    }

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

  return { filters, setFilters, filteredProductos };
};
