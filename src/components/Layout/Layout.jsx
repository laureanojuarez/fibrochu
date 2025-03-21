import CartTab from "../Cart/CartTab";
import Footer from "../Footer";
import { useState } from "react";
import Header from "../Header";
export default function Layout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="w-full min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header toggleCart={toggleCart} />
      {children}
      <Footer />
      <CartTab isOpen={isCartOpen} toggleCart={toggleCart} />
    </div>
  );
}
