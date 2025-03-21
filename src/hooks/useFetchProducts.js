import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";

export const useFetchProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data, error } = await supabase
          .from("productos")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) {
          throw error;
        }
        setProductos(data || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return { productos, loading, error };
};
