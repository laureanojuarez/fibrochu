import { getProductos } from "@/components/Products/getProductos";
import ProductSlider from "./ProductSlider";

export default async function SlideProducts() {
  try {
    // Obtener los productos en el servidor usando tu función getProductos
    const productos = await getProductos();

    // Pasar los productos al componente cliente que maneja el slider
    return <ProductSlider productos={productos} />;
  } catch (error) {
    return (
      <div className="text-primary border border-primary bg-gray-dark p-4 rounded-md m-4">
        Error al cargar los productos: {error.message}
      </div>
    );
  }
}
