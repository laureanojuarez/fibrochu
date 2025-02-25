import Image from "next/image";
import Link from "next/link";
import fibrochu from "../../assets/fibrochu.png";
import { IoCart } from "react-icons/io5";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-8 bg-gray-800 ">
      <Image src={fibrochu} alt="fibrochu" width={200} height={75} />
      <Link href="/carrito">
        <IoCart size={"2rem"} />
      </Link>
    </header>
  );
};
