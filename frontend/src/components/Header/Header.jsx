import Image from "next/image";
import Link from "next/link";
import fibrochu from "../../app/fibrochu.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaUser } from "react-icons/fa";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-8 bg-gray-700 h-16">
      <Link href="/" className="flex items-center">
        <Image src={fibrochu} alt="fibrochu" width={130} />
      </Link>
      <div className="flex gap-6">
        <Link
          href="/auth/login"
          className="text-white hover:text-gray-400 transition-colors duration-300"
        >
          <FaUser size={"1.5rem"} />
        </Link>
        <Link
          href="/carrito"
          className="text-white hover:text-gray-400 transition-colors duration-300"
        >
          <MdOutlineShoppingCart size={"1.5rem"} />
        </Link>
      </div>
    </header>
  );
};
