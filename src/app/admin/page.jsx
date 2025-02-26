"use client";

export default function Admin() {
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
      <form action="" className="flex flex-col items-center gap-4">
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </section>
  );
}
