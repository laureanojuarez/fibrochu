import { useEffect, useState } from "react";
import { ItemProducts } from "./ItemProducts";
import { clientProducts } from "../../data/clientProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cartSlice";

export const Catalogo = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setProducts(clientProducts);
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

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
    </section>
  );
};
