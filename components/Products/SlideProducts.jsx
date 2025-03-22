import { getProductos } from "@/components/Products/getProductos";
import ProductSlider from "./ProductSlider"; // Crearemos este componente a continuación

export default async function SlideProducts() {
  try {
    // Obtener los productos en el servidor usando tu función getProductos
    const productos = await getProductos();

    // Pasar los productos al componente cliente que maneja el slider
    return <ProductSlider productos={productos} />;
  } catch (error) {
    return (
      <div className="text-red-500">
        Error al cargar los productos: {error.message}
      </div>
    );
  }
}
