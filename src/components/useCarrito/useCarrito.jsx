export const useCarrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const getCarrito = async () => {
      const { data, error } = await supabase.from("carrito").select("*");
      if (error) {
        console.error("Error al obtener carrito:", error);
      } else {
        setCarrito(data);
      }
    };
    getCarrito();
  }, []);

  return <div>useCarrito</div>;
};
