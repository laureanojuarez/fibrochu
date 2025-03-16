"use client";

import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion"; // Si quieres animaciones

export function ProductGrid({ productos }) {
  if (!productos?.length) {
    return (
      <div className="text-center py-10 bg-gray-100 rounded-md">
        <p className="text-gray-700">
          No hay productos que coincidan con tu búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map((producto, index) => (
        <motion.div
          key={producto.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <ProductCard producto={producto} />
        </motion.div>
      ))}
    </div>
  );
}
