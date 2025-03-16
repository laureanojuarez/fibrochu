"use client";

import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export function ProductSort({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "newest", label: "Más recientes" },
    { value: "price-low", label: "Precio: menor a mayor" },
    { value: "price-high", label: "Precio: mayor a menor" },
  ];

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded flex items-center gap-2 text-gray-700"
      >
        <span>Ordenar: {selectedOption?.label}</span>
        <IoMdArrowDropdown size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white border rounded-md shadow-lg z-10 w-56">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                value === option.value ? "bg-rose-50 text-rose-500" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
