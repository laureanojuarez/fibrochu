import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import fibrochu from "@/app/fibrochu.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Logout from "./Auth/Logout";

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="flex justify-evenly items-center px-8 bg-stone-800 h-24">
      <Link href="/" className="flex items-center">
        <Image src={fibrochu} alt="fibrochu" width={130} />
      </Link>
      <nav className="flex items-center gap-6">
        <Link href={"/auth/dashboard"}>ADMIN</Link>

        {!user ? (
          <Link
            href={"/login"}
            className="text-white hover:text-gray-400 transition-colors duration-300"
          >
            <FaUser size={"1.5rem"} />
          </Link>
        ) : (
          <>
            <div>{user?.email}</div>
            <Logout />
          </>
        )}

        <Link
          href={"/carrito"}
          className="text-white hover:text-gray-400 transition-colors duration-300"
        >
          <MdOutlineShoppingCart size={"1.5rem"} />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
