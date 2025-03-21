import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useFetchProductos } from "../../hooks/useFetchProducts";

export default function SlideProducts() {
  const { productos } = useFetchProductos();

  const splideOptions = {
    type: "loop",
    perPage: 3,
    perMove: 1,
    padding: { left: "1rem", right: "1rem" },
    gap: "2rem",
    autoplay: true,
    pauseOnHover: true,
    interval: 3000,
    speed: 8000,
    rewind: true,
    rewindSpeed: 1000,
    classes: {
      arrows: "splide__arrows",
      arrow: "splide__arrow",
      prev: "splide__arrow--prev",
      next: "splide__arrow--next",
    },
    breakpoints: {
      640: {
        perPage: 1,
        arrows: true,
        pagination: true,
        padding: { left: "0.5rem", right: "0.5rem" },
        gap: "1rem",
      },
      1024: {
        perPage: 2,
        arrows: true,
        padding: { left: "1rem", right: "1rem" },
        gap: "1.5rem",
      },
    },
  };

  return (
    <div className="md:w-3/4 w-full">
      <Splide options={splideOptions}>
        {productos.slice(0, 3).map((producto) => (
          <SplideSlide key={producto.id}>
            <div className="relative group w-full h-[500px]">
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-95"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                <p className="text-sm">${producto.precio}</p>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
