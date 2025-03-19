import { ProductsClient } from "@/components/Products";

export const metadata = {
  title: "Catálogo de Productos | Fibrochu",
  description: "Explora nuestro catálogo completo de productos",
};

export default function ProductosPage() {
  return (
    <main>
      <ProductsClient />
    </main>
  );
}
