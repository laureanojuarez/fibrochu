import { removeFromCart } from "@/features/cartSlice";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";

export const ListCart = ({ index, item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div
      key={index}
      className="flex items-center justify-between w-full border-b"
    >
      <div className="flex items-center gap-4">
        <img
          src={item.imagen_url}
          alt={item.nombre}
          className="w-52 h-52 object-cover"
        />
        <div>
          <h2 className="text-lg font-bold">{item.nombre}</h2>
          <p>{item.descripcion}</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="text-xl text-green-600">${item.precio}</div>
        <MdDeleteForever
          onClick={() => handleRemoveFromCart(item.id)}
          size={"2rem"}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
