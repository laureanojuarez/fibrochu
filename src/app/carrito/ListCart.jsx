import { removeFromCart } from "@/features/cartSlice";
import { useDispatch } from "react-redux";

export const ListCart = ({ index, item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <li key={index} className="flex justify-evenly items-center">
      <div className="w-40 h-40 bg-orange-300"></div>
      <div>
        {item.name} - {item.description}
      </div>
      <div>${item.price}</div>
      <button onClick={() => handleRemoveFromCart(item.id)}>
        Eliminar producto
      </button>
    </li>
  );
};
