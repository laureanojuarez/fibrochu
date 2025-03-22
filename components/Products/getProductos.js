import { supabase } from "@/supabase/client";

export async function getProductos() {
  try {
    const { data, error } = await supabase.from("productos").select("*");
    if (error) {
      console.error("Error fetching products:", error);
    }
    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
}

// Hook client-side para componentes
export function useFetchProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("productos").select("*");

        if (error) {
          throw error;
        }

        setProductos(data || []);
      } catch (err) {
        console.error("Error fetching productos:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { productos, loading, error };
}
