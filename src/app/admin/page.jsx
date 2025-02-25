"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminForm from "@/components/Admin/AdminForm";
import ProductList from "@/components/Admin/ProductList";

const ADMIN_ID = "4594c8df-8981-42dd-aed4-9b3daf4ade94";

export default function Admin() {
  const [user, setUser] = useState(undefined);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (!isMounted) return;

        if (error || !user) {
          router.replace("/login");
        } else if (user.id !== ADMIN_ID) {
          router.replace("/");
        } else {
          setUser(user);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const getProductos = async () => {
      try {
        const { data, error } = await supabase.from("productos").select("*");
        if (error) {
          throw new Error(error.message);
        }
        if (isMounted) {
          setProductos(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkUser();
    getProductos();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleProductAdded = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("productos").select("*");
      if (error) {
        throw new Error(error.message);
      }
      setProductos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProductDeleted = (productoId) => {
    setProductos(productos.filter((p) => p.id !== productoId));
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
      <AdminForm onProductAdded={handleProductAdded} />
      <ProductList
        productos={productos}
        onProductDeleted={handleProductDeleted}
      />
    </div>
  );
}
