"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductSlider({ productos }) {
  // Hydration safety: evita errores de renderizado
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    customPaging: () => (
      <div className="w-3 h-3 mx-1 rounded-full bg-gray-700 hover:bg-primary transition-colors"></div>
    ),
  };

  // Si aún no estamos en el cliente, mostramos un placeholder
  if (!isClient) {
    return (
      <div className="h-48 w-full bg-gray-dark animate-pulse rounded"></div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        <span className="text-foreground">Nuestros </span>
        <span className="text-primary">Productos</span>
      </h2>
      <Slider {...settings}>
        {productos.map((producto) => (
          <div className="h-64 md:h-80 lg:h-96 w-full relative bg-gray-dark rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-800 hover:border-primary group">
            {producto.imagen_url ? (
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-dark">
                <span className="text-gray-500">Sin imagen</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-dark bg-opacity-80 p-2 transform translate-y-0 group-hover:bg-black group-hover:bg-opacity-90 transition-all">
              <h3 className="text-xs sm:text-sm font-medium truncate text-foreground">
                {producto.nombre}
              </h3>
              <p className="text-primary font-bold">${producto.precio}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
