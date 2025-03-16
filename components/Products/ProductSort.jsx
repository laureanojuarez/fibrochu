"use client";

export function ProductSort({ value, onChange }) {
  return (
    <select
      className="p-2 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="newest">Más recientes</option>
      <option value="price-low">Precio: menor a mayor</option>
      <option value="price-high">Precio: mayor a menor</option>
    </select>
  );
}
