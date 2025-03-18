"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

function ProductList({ productos, onDelete, updateProducto, onUpdate }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editedNombre, setEditedNombre] = useState("");
  const [editedDescripcion, setEditedDescripcion] = useState("");
  const [editedPrecio, setEditedPrecio] = useState("");

  const handleOpenModal = (producto) => {
    setSelectedProduct(producto);
    setNewStock(producto.stock);
    setEditedNombre(producto.nombre);
    setEditedDescripcion(producto.descripcion);
    setEditedPrecio(producto.precio);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleUpdate = async () => {
    if (!selectedProduct) return;

    try {
      await updateProducto(
        selectedProduct.id,
        editedNombre,
        editedDescripcion,
        editedPrecio,
        newStock
      );

      handleCloseModal();

      // Opcionalmente actualizar productos
      if (onUpdate) {
        onUpdate(
          selectedProduct.id,
          editedNombre,
          editedDescripcion,
          editedPrecio,
          newStock
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error al actualizar el producto");
    }
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Productos Existentes</h2>
      {productos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gray-100 relative">
                {producto.imagen_url ? (
                  <img
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-800">{producto.nombre}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {producto.descripcion}
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <span className="text-blue-600 font-semibold">
                      ${producto.precio}
                    </span>
                    <span className="text-gray-500 ml-2">
                      Stock: {producto.stock}
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => handleOpenModal(producto)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(producto.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No hay productos agregados. ¡Agrega tu primer producto!
        </div>
      )}

      {/* Modal para editar el producto */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Editar Producto
                </h3>
                <div className="mt-2">
                  <div className="mb-4">
                    <label
                      htmlFor="nombre"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      value={editedNombre}
                      onChange={(e) => setEditedNombre(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="descripcion"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Descripción
                    </label>
                    <textarea
                      id="descripcion"
                      value={editedDescripcion}
                      onChange={(e) => setEditedDescripcion(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="precio"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Precio
                    </label>
                    <input
                      type="number"
                      id="precio"
                      value={editedPrecio}
                      onChange={(e) => setEditedPrecio(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="stock"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Stock
                    </label>
                    <input
                      type="number"
                      id="stock"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleUpdate}
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen_url, setImagenUrl] = useState("");
  const [stock, setStock] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);

  useEffect(() => {
    async function loadProductos() {
      const productosData = await getProductosAdmin();
      setProductos(productosData);
      setLoading(false);
    }

    loadProductos();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      try {
        await deleteProducto(id);
        setProductos(productos.filter((producto) => producto.id !== id));
      } catch (error) {
        console.error("Error deleting producto:", error);
        alert("Error al eliminar el producto");
      }
    }
  };

  const handleUpdate = async (id, nombre, descripcion, precio, stock) => {
    try {
      await updateProducto(id, nombre, descripcion, precio, stock);
      setProductos(
        productos.map((producto) =>
          producto.id === id
            ? { ...producto, nombre, descripcion, precio, stock }
            : producto
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error al actualizar el producto");
    }
  };

  const handleAddProduct = async () => {
    try {
      // Validar que los campos no estén vacíos
      if (!nombre || !descripcion || !precio || !stock) {
        alert("Por favor, complete todos los campos.");
        return;
      }

      // Verificar que haya imagen (archivo o URL)
      if (!imagenFile && !imagen_url) {
        alert("Por favor, suba una imagen o proporcione una URL de imagen.");
        return;
      }

      // Crear el nuevo producto
      const newProduct = await addProducto({
        nombre,
        descripcion,
        precio,
        imagen_url,
        stock,
        imagenFile,
      });

      // Actualizar la lista de productos
      setProductos([...productos, ...newProduct]);

      // Limpiar los campos del formulario
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setImagenUrl("");
      setStock("");
      setImagenFile(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error al agregar el producto");
    }
  };

  const getProductosAdmin = async () => {
    const response = await fetch("/api/productos");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  };

  const deleteProducto = async (id) => {
    const response = await fetch("/api/productos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    return response.json();
  };

  const updateProducto = async (id, nombre, descripcion, precio, stock) => {
    try {
      const response = await fetch("/api/productos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          nombre,
          descripcion,
          precio: parseFloat(precio), // Asegurar que sea número
          stock: parseInt(stock), // Asegurar que sea número
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error(`Error: ${errorData.error || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const addProducto = async (productData) => {
    try {
      let imagen_url = productData.imagen_url;

      if (productData.imagenFile) {
        const supabase = createClient();
        const fileExt = productData.imagenFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from("product-photos")
          .upload(`imagenes/${fileName}`, productData.imagenFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) throw error;

        const { data: urlData } = supabase.storage
          .from("product-photos")
          .getPublicUrl(`imagenes/${fileName}`);

        imagen_url = urlData.publicUrl;
      }

      // Enviar los datos del producto con la URL de la imagen
      const response = await fetch("/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: productData.nombre,
          descripcion: productData.descripcion,
          precio: productData.precio,
          stock: productData.stock,
          imagen_url,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      return response.json();
    } catch (error) {
      console.error("Error al agregar producto:", error);
      throw error;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenFile(file);

      // Crear vista previa
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex items-center justify-between mb-8 bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Panel de Administración
        </h1>
        <span className="text-sm text-gray-600">Usuario</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Producto</h2>
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="descripcion"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="precio"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Precio
            </label>
            <input
              type="number"
              id="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Imagen del producto
            </label>

            {previewImage && (
              <div className="mb-2">
                <img
                  src={previewImage}
                  alt="Vista previa"
                  className="w-full h-40 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagenFile(null);
                    setPreviewImage(null);
                  }}
                  className="mt-1 text-xs text-red-500"
                >
                  Eliminar imagen
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="imagen"
                  className="block text-gray-700 text-xs mb-1"
                >
                  Subir imagen
                </label>
                <input
                  type="file"
                  id="imagen"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="imagen_url"
                  className="block text-gray-700 text-xs mb-1"
                >
                  O ingresa URL
                </label>
                <input
                  type="text"
                  id="imagen_url"
                  value={imagen_url}
                  onChange={(e) => setImagenUrl(e.target.value)}
                  disabled={!!imagenFile}
                  placeholder="https://"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Agregar Producto
          </button>
        </div>

        {loading ? (
          <div>Cargando productos...</div>
        ) : (
          <ProductList
            productos={productos}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            updateProducto={updateProducto}
          />
        )}
      </div>
    </div>
  );
}
