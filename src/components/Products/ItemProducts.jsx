export const ItemProducts = ({ product, onAddToCart }) => {
  return (
    <div className="flex flex-col items-center justify-center w-48 h-72 border border-gray-300 rounded bg-gray-400 text-black p-2">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={() => onAddToCart(product)}>COMPRAR</button>
    </div>
  );
};
