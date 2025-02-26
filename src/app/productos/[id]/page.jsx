"use client";

import { useParams } from "next/navigation";

export default function ProductoDetalle() {
  const { id } = useParams();

  const mockProducts = [
    {
      id: 1,
      nombre: "Producto 1",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      precio: 100,
      imagen_url: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      nombre: "Producto 2",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      precio: 200,
      imagen_url: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      nombre: "Producto 3",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      precio: 300,
      imagen_url: "https://via.placeholder.com/300",
    },
  ];

  const productoId = parseInt(id, 10);
  const producto = mockProducts.find((p) => p.id === productoId);

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold">{producto.nombre}</h1>
      <img
        src={producto.imagen_url}
        alt={producto.nombre}
        className="w-96 h-auto my-4"
      />
      <p className="text-lg">{producto.descripcion}</p>
      <p className="text-green-600 text-xl">${producto.precio}</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Comprar
      </button>
    </div>
  );
}
