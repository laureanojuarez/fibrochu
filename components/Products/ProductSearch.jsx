"use client";

import { FaSearch } from "react-icons/fa";

export function ProductSearch({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar productos..."
        className="pr-10 pl-4 py-2 border rounded-full w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}
