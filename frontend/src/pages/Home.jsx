import { Navigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { getPublicProducts } from '../services/api.js'
import AuthContext from '../components/AuthContext.jsx'
import instrumentos from '../assets/instrumentos.jpg'
import guitarras from '../assets/guitarras.jpg'
import teclados from '../assets/teclados.jpg'
import baterias from '../assets/baterias.jpg'
import accesorios from '../assets/accesorios.jpg'
import guitarraAcustica from '../assets/guitarra-acustica.jpg'
import guitarraElectrica from '../assets/guitarra-electrica.jpg'
import tecladoClasico from '../assets/teclado-clasico.jpg'
import pianoYamaha from '../assets/piano-yamaha.jpg'
import bateriaAcustica from '../assets/bateria-acustica.jpg'
import bateriaElectronica from '../assets/bateria-electronica.jpg'
import microfono from '../assets/microfono.jpg'
import auriculares from '../assets/auriculares.jpg'
import soporteGuitarra from '../assets/soporte-guitarra.jpg'
import afinador from '../assets/afinador.jpg'
import ukelele from '../assets/ukelele.jpg'
import pedalBoss from '../assets/pedal-boss.jpg'

function Home() {
  const { adminAccessToken, clientAccessToken } = useContext(AuthContext)
  // imagenes
  const imagenesProductos = {
    'Guitarra Acústica Yamaha F310': guitarraAcustica,
    'Guitarra Eléctrica Fender Squier Stratocaster': guitarraElectrica,
    'Teclado Musical Casio CT-S300': tecladoClasico,
    'Piano Digital Yamaha P-45': pianoYamaha,
    'Batería Acústica Mapex Tornado': bateriaAcustica,
    'Batería Electrónica Yamaha DTX402K': bateriaElectronica,
    'Micrófono Dinámico Shure SM58': microfono,
    'Auriculares de Estudio Audio-Technica ATH-M20x': auriculares,
    'Soporte para Guitarra Hercules': soporteGuitarra,
    'Afinador Cromático Korg CA-2': afinador,
    'Ukelele Soprano Kala': ukelele,
    'Pedal de Efectos Boss DS-1': pedalBoss,
  }

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Busqueda y Paginación
  const [busqueda, setBusqueda] = useState('');
  const [category, setCategory] = useState('');
  const [order, setOrder] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 8;

  const getProducts = async () => {
    try {
      setCargando(true);
      setError('');
      const params = {
        busqueda,
        category,
        sortBy: order ? "price" : undefined,
        order,
        page,
        limit,
      }
      const response = await getPublicProducts(params);
      console.log(response.data.data.products)
      setProductos(response.data.data.products)
      setTotalPages(response.data.data.totalPaginas);

    } catch (error) {
      console.log('Error al obtener productos', error.message)
    } finally {
      setCargando(false)
    }
  }
  useEffect(() => {
    getProducts();
  }, [page]);

  const handleBusqueda = () => {
    if (page === 1) {
      getProducts();
    } else {
      setPage(1);
    }
  };
  // Redirecciones según la sesión
  if (adminAccessToken) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return (
    <>
      <main className="bg-[#F7F4EF] dark:bg-[#121212]">

        {/* HERO */}
        <section className="flex flex-col md:flex-row items-center gap-8 px-6 py-10 md:px-12 md:py-16">

          {/* Imagen */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <img
              src={instrumentos}
              alt="Instrumentos musicales"
              className="w-full h-64 md:h-96 object-cover rounded"
            />
          </div>

          {/* Texto */}
          <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left">

            <h1 className="text-3xl md:text-5xl font-semibold text-[#29241F] dark:text-white mb-4">
              El Arpa de David
            </h1>

            <p className="text-lg text-[#665D53] dark:text-gray-300 mb-6">
              Encontrá los instrumentos musicales y accesorios
              que necesitás para expresar tu pasión por la música.
            </p>

            <a
              href="#productos"
              className="inline-block bg-[#C8793D] text-white px-6 py-3 rounded hover:bg-[#AD6532]"
            >
              Ver productos
            </a>

          </div>

        </section>
        {/* CATEGORÍAS */}
        <section id='categorias' className="px-6 py-10 md:px-12">

          <h2 className="text-2xl font-semibold text-center mb-8 text-[#29241F] dark:text-white">
            Nuestras categorías
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white dark:bg-[#24211E] rounded border border-[#E7E0D6] dark:border-[#44403C] overflow-hidden hover:scale-105 transition-all">
              <img src={guitarras} alt="Guitarras" className="w-full h-48 object-cover" />
              <h3 className="text-center font-medium p-4 text-[#29241F] dark:text-white">
                Guitarras
              </h3>
            </div>

            <div className="bg-white dark:bg-[#24211E] rounded border border-[#E7E0D6] dark:border-[#44403C] overflow-hidden hover:scale-105 transition-all">
              <img src={teclados} alt="Teclados" className="w-full h-48 object-cover" />
              <h3 className="text-center font-medium p-4 text-[#29241F] dark:text-white">
                Teclados
              </h3>
            </div>

            <div className="bg-white dark:bg-[#24211E] rounded border border-[#E7E0D6] dark:border-[#44403C] overflow-hidden hover:scale-105 transition-all">
              <img src={baterias} alt="Baterías" className="w-full h-48 object-cover" />
              <h3 className="text-center font-medium p-4 text-[#29241F] dark:text-white">
                Baterías
              </h3>
            </div>

            <div className="bg-white dark:bg-[#24211E] rounded border border-[#E7E0D6] dark:border-[#44403C] overflow-hidden hover:scale-105 transition-all">
              <img src={accesorios} alt="Accesorios" className="w-full h-48 object-cover" />
              <h3 className="text-center font-medium p-4 text-[#29241F] dark:text-white">
                Accesorios
              </h3>
            </div>

          </div>
        </section>
        {/* PRODUCTOS */}
        <section id="productos" className="px-6 py-10 md:px-12">

          <h2 className="text-2xl font-semibold text-center mb-8 text-[#29241F] dark:text-white">
            Nuestros productos
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-3xl mx-auto">

            <input
              type="text"
              placeholder="Buscar instrumentos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleBusqueda();
              }}
              className="flex-1 px-4 py-3 rounded border border-[#E7E0D6] bg-white dark:bg-[#24211E] dark:text-white"
            />

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="px-4 py-3 rounded border border-[#E7E0D6] bg-white dark:bg-[#24211E] dark:text-white"
            >
              <option value="">Todas las categorías</option>
              <option value="Guitarras">Guitarras</option>
              <option value="Teclados">Teclados</option>
              <option value="Baterías">Baterías</option>
              <option value="Accesorios">Accesorios</option>
            </select>

            <select
              value={order}
              onChange={(e) => {
                setOrder(e.target.value);
                setPage(1);
              }}
              className="px-4 py-3 rounded border border-[#E7E0D6] bg-white dark:bg-[#24211E] dark:text-white"
            >
              <option value="">Ordenar por precio</option>
              <option value="ASC">Menor a mayor</option>
              <option value="DESC">Mayor a menor</option>
            </select>

            <button
              onClick={handleBusqueda}
              className="bg-[#C8793D] text-white px-6 py-3 rounded hover:bg-[#AD6532]"
            >
              Buscar
            </button>

          </div>

          {cargando && (
            <p className="text-center dark:text-white">
              Cargando productos...
            </p>
          )}

          {error && (
            <p className="text-center text-red-500">
              {error}
            </p>
          )}

          {!cargando && !error && productos.length === 0 && (
            <p className="text-center dark:text-white">
              No hay productos disponibles.
            </p>
          )}


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {productos.map((producto) => {

              const precioOriginal = Number(producto.price);
              const descuento = Number(producto.discount || 0);

              const precioFinal = precioOriginal * (1 - descuento / 100);

              return (
                <div
                  key={producto.id}
                  className="bg-white dark:bg-[#24211E] border border-[#E7E0D6] dark:border-[#44403C] rounded overflow-hidden"
                >

                  <div className="relative">

                    <img
                      src={imagenesProductos[producto.name] || accesorios}
                      alt={producto.name}
                      className="w-full aspect-square object-cover"
                    />

                    {descuento > 0 && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded">
                        -{descuento}%
                      </span>
                    )}

                  </div>

                  <div className="p-4">

                    <h3 className="font-medium text-[#29241F] dark:text-white">
                      {producto.name}
                    </h3>

                    {descuento > 0 ? (
                      <div className="mt-2">

                        <p className="text-gray-400 line-through text-sm">
                          ${precioOriginal.toLocaleString('es-AR')}
                        </p>

                        <p className="text-[#C8793D] font-semibold text-lg">
                          ${precioFinal.toLocaleString('es-AR', {
                            maximumFractionDigits: 2
                          })}
                        </p>

                      </div>
                    ) : (
                      <p className="text-[#C8793D] font-semibold text-lg mt-2">
                        ${precioOriginal.toLocaleString('es-AR')}
                      </p>
                    )}

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Stock disponible: {producto.stock}
                    </p>

                    <button
                      className="w-full bg-[#C8793D] text-white py-2 rounded mt-4 hover:bg-[#AD6532]"
                    >
                      Comprar
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

          {!cargando && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">

              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 rounded bg-[#C8793D] text-white disabled:opacity-40"
              >
                Anterior
              </button>

              <span className="text-[#29241F] dark:text-white">
                Página {page} de {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 rounded bg-[#C8793D] text-white disabled:opacity-40"
              >
                Siguiente
              </button>

            </div>
          )}
        </section>

      </main>
      <footer className="bg-[#29241F] text-white px-6 py-10 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Columna 1: Información */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              El Arpa de David
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed">
              Encontrá instrumentos musicales y accesorios
              para acompañar tu pasión por la música.
            </p>
          </div>

          {/* Columna 2: Enlaces */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Enlaces
            </h3>

            <div className="flex flex-col gap-2 text-gray-300 text-sm">
              <a href="/" className="hover:text-[#C8793D]">
                Inicio
              </a>

              <a href="#categorias" className="hover:text-[#C8793D]">
                Categorías
              </a>

              <a href="#productos" className="hover:text-[#C8793D]">
                Productos
              </a>
            </div>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Contacto
            </h3>

            <p className="text-gray-300 text-sm">
              ¿Tenés alguna consulta? Estamos para ayudarte.
            </p>
          </div>

        </div>

        {/* Derechos reservados */}
        <div className="border-t border-gray-600 mt-8 pt-5 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} El Arpa de David. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Home