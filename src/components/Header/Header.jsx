import Image from "next/image";
import Link from "next/link";
import fibrochu from "../../assets/fibrochu.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaUser } from "react-icons/fa";

export const Header = () => {
  return (
    <header className="flex justify-evenly items-center px-8 bg-gray-800 ">
      <Link href="/">
        <Image src={fibrochu} alt="fibrochu" width={200} height={75} />
      </Link>
      <div className="flex gap-4">
        <Link href="/admin">
          <FaUser size={"1.5rem"} className="text-white" />
        </Link>
        <Link href="/carrito">
          <MdOutlineShoppingCart size={"1.5rem"} className="text-white" />
        </Link>
      </div>
    </header>
  );
};
