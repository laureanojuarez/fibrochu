import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

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

    getProductos();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshProductos = async () => {
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

  return { productos, setProductos, loading, error, refreshProductos };
};
