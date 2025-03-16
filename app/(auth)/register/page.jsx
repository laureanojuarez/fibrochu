import SignUpForm from "@/components/Auth/SingupForm";
import Link from "next/link";
import React from "react";

const SignUp = async () => {
  return (
    <div className="w-full flex mt-20 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">Registro</h1>
        <SignUpForm />
        <div className="mt-2 flex items-center">
          <h1>Ya tienes una cuenta?</h1>
          <Link className="font-bold ml-2" href="/login">
            Inicia Sesión
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
