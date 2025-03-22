import { useFetchProductos } from "../../hooks/useFetchProducts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SlideProducts() {
  const { productos, loading, error } = useFetchProductos();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error al cargar los productos: {error.message}</div>;
  }

  return (
    <div className="slider-container w-full px-4" style={{ margin: "0 auto" }}>
      {productos && productos.length > 0 ? (
        <Slider {...settings}>
          {productos.map((producto) => (
            <div key={producto.id} className="slide-item px-4">
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                className="h-124 w-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div>No hay productos disponibles</div>
      )}
    </div>
  );
}

export default SlideProducts;
