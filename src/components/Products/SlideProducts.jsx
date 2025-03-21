import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useFetchProductos } from "../../hooks/useFetchProducts";

export default function SlideProducts() {
  const { productos } = useFetchProductos();

  const splideOptions = {
    type: "loop",
    perPage: 3,
    padding: "1rem",
    gap: "0.5rem",
    classes: {
      arrows: "splide__arrows",
      arrow: "splide__arrow",
      prev: "splide__arrow--prev",
      next: "splide__arrow--next",
    },
    breakpoints: {
      640: {
        perPage: 1,
        arrows: false,
        pagination: true,
      },
      1024: {
        perPage: 2,
        arrows: true,
      },
    },
  };

  return (
    <div className="md:w-3/4 w-full ">
      <Splide options={splideOptions}>
        {productos.map((producto) => (
          <SplideSlide key={producto.id}>
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              width={350}
              className="rounded-lg mx-auto h-96 object-cover"
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
