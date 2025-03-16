import ResetPassword from "@/components/Auth/ResetPassword";

export default function ResetPasswordPage() {
  return (
    <>
      <div className="w-full flex mt-20 justify-center">
        <section className="flex flex-col w-[400px]">
          <h1 className="text-3xl w-full text-center font-bold mb-6">
            Recupera contraseña
          </h1>
          <ResetPassword />
        </section>
      </div>
    </>
  );
}
