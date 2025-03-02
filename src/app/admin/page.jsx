"use client";

import ProductList from "@/components/Products/ProductList";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { addProduct } from "@/components/Products/AddProduct";

export default function Admin() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const allowedUserId = "d27f9f61-39b6-426f-9c34-cde7a4b63e8d";

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (!user || user.id !== allowedUserId) {
        router.push("/auth");
      }
    };
    getUser();
  }, [router]);

  if (!user || user.id !== allowedUserId) {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newProduct = await addProduct({
        nombre,
        descripcion,
        precio: parseFloat(precio), // Asegúrate de que el precio sea un número
        imagen,
        createdAt: new Date().toISOString(),
      });

      console.log("Producto agregado:", newProduct);
      alert("Producto agregado correctamente");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error al agregar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          required
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
          required
        />
        <input
          type="file"
          onChange={(e) => setImagen(e.target.files[0])}
          accept="image/*"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Agregando..." : "Agregar Producto"}
        </button>
      </form>

      <ProductList isAdmin={true} />
    </section>
  );
}
