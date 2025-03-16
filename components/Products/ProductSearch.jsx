"use client";

import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export function ProductSearch({ value, onChange, placeholder = "Buscar..." }) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={`relative flex items-center bg-white rounded-full border transition-all duration-200 ${
        isFocused ? "border-rose-400 shadow-sm" : "border-gray-300"
      }`}
    >
      <FaSearch className="absolute left-4 text-gray-400" />

      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="pl-12 pr-10 py-2.5 rounded-full w-full outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {value && (
        <button
          onClick={handleClear}
          className="absolute right-4 text-gray-400 hover:text-rose-500 transition-colors"
          aria-label="Clear search"
        >
          <IoMdClose size={18} />
        </button>
      )}
    </div>
  );
}
