"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

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
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
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

  // Si aún no estamos en el cliente, mostramos un placeholder
  if (!isClient) {
    return (
      <div className="h-48 w-full bg-gray-100 animate-pulse rounded"></div>
    );
  }

  return (
    <div className="w-full max-w-6xl px-4">
      <Slider {...settings}>
        {productos.map((producto) => (
          <Link key={producto.id} href={`/productos/${producto.id}`}>
            <div className="p-2">
              <div className="h-56 relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                {producto.imagen_url ? (
                  <img
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500">Sin imagen</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
                  <h3 className="text-sm font-medium truncate">
                    {producto.nombre}
                  </h3>
                  <p className="text-rose-300 font-bold">${producto.precio}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}
