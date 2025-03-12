import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState(0);
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true);

  const supabase = createClient();

  // Verificar sesión de usuario
  useEffect(() => {
    async function initialize() {
      try {
        // Simplemente obtener el usuario actual sin redirección
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);

        fetchProductos();
      } catch (error) {
        console.error("Error al inicializar:", error);
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, []);
  // Obtener productos
  async function fetchProductos() {
    try {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProductos(data || []);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoadingProductos(false);
    }
  }

  // Preview de imagen
  useEffect(() => {
    if (!imagen) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imagen);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imagen]);

  // Cerrar sesión
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  // Manejo del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imagenUrl = null;

      if (imagen) {
        const fileExt = imagen.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `productos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-photos")
          .upload(filePath, imagen);

        if (uploadError) throw uploadError;

        // Obtener URL pública
        const {
          data: { publicUrl },
        } = supabase.storage.from("productos").getPublicUrl(filePath);

        imagenUrl = publicUrl;
      }

      // 2. Insertar producto en la base de datos
      const { error, data } = await supabase
        .from("productos")
        .insert([
          {
            nombre,
            descripcion,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            imagen_url: imagenUrl,
          },
        ])
        .select();

      if (error) throw error;

      // 3. Actualizar lista local
      setProductos([data[0], ...productos]);

      // 4. Resetear formulario
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock(0);
      setImagen(null);
      setPreview(null);

      alert("Producto agregado correctamente");
    } catch (error) {
      console.error("Error al enviar el formulario:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    user,
    loading,
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    precio,
    setPrecio,
    stock,
    setStock,
    imagen,
    setImagen,
    preview,
    setPreview,
    isSubmitting,
    productos,
    loadingProductos,
    handleSubmit,
    handleSignOut,
  };
}
