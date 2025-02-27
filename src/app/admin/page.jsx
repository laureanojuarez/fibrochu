"use client";

import { addProduct } from "@/components/AddProduct";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";

export default function Admin() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({ nombre, descripcion, precio, imagen });
      alert("Producto subido con éxito");
    } catch (error) {
      console.error("Error al subir el producto: ", error);
      alert("Error al subir el producto");
    }
  };

  return (
    <ProtectedRoute>
      <section className="flex flex-col items-center w-full">
        <div className="flex items-center justify-evenly w-full">
          <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Nombre del Producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            placeholder="Descripción del Producto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="file"
            onChange={(e) => setImagen(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Subir Producto
          </button>
        </form>
      </section>
    </ProtectedRoute>
  );
}
