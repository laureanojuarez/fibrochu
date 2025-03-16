"use client";

const CartSummary = ({ total }) => {
  return (
    <div className="border-t border-gray-200 pt-3 mt-2">
      <div className="flex justify-between items-center font-bold">
        <span>Total:</span>
        <span>${Number(total).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;
