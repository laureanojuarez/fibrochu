import { useEffect, useState } from "react";
import { ItemProducts } from "./ItemProducts";
import { clientProducts } from "../../data/clientProducts";

export const Catalogo = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setProducts(clientProducts);
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <section className="flex flex-col">
      <div className="flex  flex-wrap justify-center gap-4 p-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ItemProducts
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
      <button onClick={handleClearCart}>ELIMINAR TODO DEL CARRITO</button>
    </section>
  );
};
