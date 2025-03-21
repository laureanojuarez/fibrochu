export default function ProductCard({ productos }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {productos.map((producto) => (
        <div key={producto.id}>
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <p>{producto.precio}</p>
          <img src={producto.imagen_url} alt={producto.nombre} width={300} />
        </div>
      ))}
    </div>
  );
}
