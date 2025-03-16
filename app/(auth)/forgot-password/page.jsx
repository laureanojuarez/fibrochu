import ForgotPassword from "@/components/Auth/ForgotPassword";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="w-full flex mt-20 justify-center">
        <section className="flex flex-col w-[400px]">
          <h1 className="text-3xl w-full text-center font-bold mb-6">
            Recuperar contraseña
          </h1>
          <ForgotPassword />
        </section>
      </div>
    </>
  );
}
