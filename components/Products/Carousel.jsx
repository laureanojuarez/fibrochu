"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";

export function Carousel({ bucket = "product-photos", limit = 15 }) {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const imagesPerPage = 3;

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);

        // Obtener lista de imágenes desde Supabase Storage
        const { data, error } = await supabase.storage
          .from(bucket)
          .list("public", {
            limit: limit,
            sortBy: { column: "name", order: "asc" },
          });

        if (error) {
          console.error("Error fetching images:", error);
          return;
        }

        // Filtrar solo archivos de imagen y crear URLs públicas
        const imageFiles = data
          .filter((file) => file.name.match(/\.(jpeg|jpg|png|gif|webp)$/i))
          .map((file) => ({
            name: file.name,
            url: supabase.storage
              .from(bucket)
              .getPublicUrl(`public/${file.name}`).data.publicUrl,
          }));

        setImages(imageFiles);
      } catch (error) {
        console.error("Error in fetchImages:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [bucket, limit]);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(images.length / imagesPerPage);

  // Obtener las imágenes para la página actual
  const getCurrentPageImages = () => {
    const startIndex = currentPage * imagesPerPage;
    return images.slice(startIndex, startIndex + imagesPerPage);
  };

  const goToNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const goToPrevious = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  if (loading) {
    return (
      <div className="w-full h-64 bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
        Cargando imágenes...
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-900 rounded-lg flex items-center justify-center">
        No hay imágenes disponibles
      </div>
    );
  }

  const currentImages = getCurrentPageImages();

  return (
    <div className="relative w-full">
      {/* Contenedor del carrusel */}
      <div className="relative h-64 overflow-hidden rounded-lg">
        {/* Grid de 3 imágenes */}
        <div className="w-full h-full flex gap-2">
          {currentImages.map((image, index) => (
            <div
              key={index}
              className="flex-1 h-full transition-all duration-500 ease-in-out"
            >
              <img
                src={image.url}
                alt={`Imagen ${currentPage * imagesPerPage + index + 1}`}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          ))}
          {/* Relleno para cuando hay menos de 3 imágenes en la última página */}
          {currentImages.length < imagesPerPage &&
            Array(imagesPerPage - currentImages.length)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="flex-1 h-full bg-gray-800 opacity-30 rounded-md"
                ></div>
              ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
          aria-label="Página anterior"
        >
          ←
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
          aria-label="Página siguiente"
        >
          →
        </button>

        {/* Indicadores de página */}
        {totalPages > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentPage
                    ? "bg-primary w-4"
                    : "bg-white bg-opacity-50"
                }`}
                aria-label={`Ir a página ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
