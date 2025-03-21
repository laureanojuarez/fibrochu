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
    <div className="flex flex-col justify-between min-h-screen">
      <Header toggleCart={toggleCart} />
      {children}
      <Footer />
      <CartTab isOpen={isCartOpen} toggleCart={toggleCart} />
    </div>
  );
}
