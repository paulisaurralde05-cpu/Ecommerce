import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

function Productos() {
  const [products, setProducts] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [category, setCategory] = useState('');
  const [order, setOrder] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');
  const limit = 5;

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

  }

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleBusqueda = () => {
    setPage(1);
    fetchProducts();
  }
  return (
    <div>
      <input type="text" value={busqueda} onChange={(e) => { setBusqueda(e.target.value) }}
        onKeyDown={(e) => { if (e.key === 'Enter') handleBusqueda() }}
      />
      <button onClick={handleBusqueda}>Buscar</button>

      <select value={category} onChange={(e) => {
        setCategory(e.target.value)
        setPage(1);
      }}>
        <option value="">Todas Las Categorias</option>
        <option value="Procesadores">Procesadores</option>
        <option value="Motherboards">Motherboards</option>
        <option value="Memorias">Memorias</option>
        <option value="Placas de video">Placas de video</option>
        <option value="Gabinetes">Gabinetes</option>
        <option value="Fuentes">Fuentes</option>
        <option value="Almacenamiento">Almacenamiento</option>
      </select>

      <select value={order} onChange={(e) => {
        setOrder(e.target.value)
        setPage(1);
      }}>
        <option value="">Ordenar por precio</option>
        <option value="ASC">Menor a mayor</option>
        <option value="DESC">Mayor a menor</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>nombre</th>
            <th>precio</th>
            <th>stock</th>
            <th>categoria</th>
          </tr>
        </thead>
        <tbody>
          {products?.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>{p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button disabled={page === 1} onChange={(e) => { setPage(e.target.value) }} onClick={() => setPage(page - 1)}>
          Anterior
        </button>
        <span>
          pagina {page} de {totalPages}
        </span>
        <button disabled={page === totalPages} onChange={(e) => { setPage(e.target.value) }} onClick={() => setPage(page + 1)}>
          Siguiente
        </button>
      </div>

    </div>
  )
}

export default Productos
