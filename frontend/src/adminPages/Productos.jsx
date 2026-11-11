
import { useState, useEffect, useContext } from 'react';
import { getProducts, deleteProduct } from '../services/api';
import Form from '../components/Form.jsx';
import AuthContext from '../components/AuthContext.jsx';

function Productos() {
  const { adminAccessToken } = useContext(AuthContext);

  const [products, setProducts] = useState([]);

  // Busqueda y paginacion
  const [busqueda, setBusqueda] = useState('');
  const [category, setCategory] = useState('');
  const [order, setOrder] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');
  const limit = 5;

  const [openForm, setOpenForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await getProducts({
        busqueda,
        category,
        sortBy: order ? "price" : undefined,
        order,
        page,
        limit,
      });

      setProducts(response.data.data.products);
      setTotalPages(response.data.data.totalPaginas);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleBusqueda = () => {
    setPage(1);
    fetchProducts();
  };

  // Funciones para crear, editar y eliminar
  const [productSelected, setProductSelected] = useState(null);
  const [deleteProd, setDeleteProd] = useState({ estado: false, id: null });

  const createProduct = () => {
    setOpenForm(true);
    setProductSelected(null);
  };

  const editProduct = (p) => {
    setOpenForm(true);
    setProductSelected(p);
  };

  const deleteProducto = async (id) => {
    if (id === null) return;

    try {
      await deleteProduct(id, adminAccessToken);
      setDeleteProd({ estado: false, id: null });

      if (products.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        await fetchProducts();
      }
    } catch (error) {
      console.error('Error al eliminar producto', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#29241F]">
              Gestión de productos
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Administrá los productos de la tienda.
            </p>
          </div>

          <button
            onClick={createProduct}
            className="bg-[#C8793D] hover:bg-[#AD6532] text-white px-5 py-2.5 rounded font-medium transition"
          >
            + Crear producto
          </button>
        </div>

        {/* Busqueda y filtros */}
        <div className="bg-white p-4 rounded-lg border border-[#E7E0D6] mb-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            <input
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleBusqueda();
              }}
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#C8793D]"
            />

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#C8793D]"
            >
              <option value="">Todas las categorías</option>
              <option value="Guitarras">Guitarras</option>
              <option value="Baterías">Baterías</option>
              <option value="Teclados">Teclados</option>
              <option value="Accesorios">Accesorios</option>

            </select>

            <select
              value={order}
              onChange={(e) => {
                setOrder(e.target.value);
                setPage(1);
              }}
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#C8793D]"
            >
              <option value="">Ordenar por precio</option>
              <option value="ASC">Menor a mayor</option>
              <option value="DESC">Mayor a menor</option>
            </select>

            <button
              onClick={handleBusqueda}
              className="bg-[#29241F] hover:bg-[#443B33] text-white rounded px-4 py-2 transition"
            >
              Buscar
            </button>

          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg border border-[#E7E0D6] overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-sm text-left">

              <thead className="bg-[#29241F] text-white">
                <tr>
                  <th className="px-5 py-4">Nombre</th>
                  <th className="px-5 py-4">Precio</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4">Categoría</th>
                  <th className="px-5 py-4 text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {products?.length > 0 ? (
                  products.map(p => (
                    <tr
                      key={p.id}
                      className="border-b border-[#E7E0D6] hover:bg-[#F7F4EF] transition"
                    >
                      <td className="px-5 py-4 font-medium text-[#29241F]">
                        {p.name}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        ${Number(p.price).toLocaleString('es-AR')}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {p.stock}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {p.category}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() => editProduct(p)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => setDeleteProd({
                              estado: true,
                              id: p.id
                            })}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded transition"
                          >
                            Eliminar
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-8 text-gray-500"
                    >
                      No se encontraron productos.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>

          </div>
        </div>

        {/* Paginacion */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-6">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-white border border-[#E7E0D6] px-4 py-2 rounded disabled:opacity-40 hover:bg-[#E7E0D6] transition"
          >
            Anterior
          </button>

          <span className="text-[#29241F] font-medium">
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-white border border-[#E7E0D6] px-4 py-2 rounded disabled:opacity-40 hover:bg-[#E7E0D6] transition"
          >
            Siguiente
          </button>

        </div>

        {/* Formulario */}
        {openForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

              <h2 className="text-xl font-bold text-[#29241F] mb-5">
                {productSelected ? 'Editar producto' : 'Crear producto'}
              </h2>

              <Form
                producto={productSelected}
                onCancelar={() => setOpenForm(false)}
                onGuardar={fetchProducts}
              />

            </div>
          </div>
        )}

        {/* Confirmacion de eliminacion */}
        {deleteProd.estado && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">

              <h2 className="text-xl font-bold text-[#29241F] mb-3">
                Confirmar eliminación
              </h2>

              <p className="text-gray-600 mb-6">
                ¿Deseás eliminar este producto permanentemente?
              </p>

              <div className="flex justify-end gap-3">

                <button
                  onClick={() => setDeleteProd({
                    estado: false,
                    id: null
                  })}
                  className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
                >
                  Cancelar
                </button>

                <button
                  onClick={() => deleteProducto(deleteProd.id)}
                  disabled={deleteProd.id === null}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50 transition"
                >
                  Aceptar
                </button>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Productos;
