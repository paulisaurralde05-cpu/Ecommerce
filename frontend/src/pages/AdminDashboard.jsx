
import { useEffect, useState, useContext } from 'react'
import { getMetricas } from '../services/api';
import AuthContext from '../components/AuthContext.jsx';
import SideBar from '../components/SideBar.jsx';

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);

  const { logoutAdmin, adminAccessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await getMetricas('admin', adminAccessToken);
        setAdmin(response.data);
      } catch (e) {
        setError(`Error: ${e.message}`);
        console.error(e);
      }
    };

    fetchPerfil();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F4EF] p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#29241F]">
              Panel de administración
            </h1>

            <p className="text-gray-500 mt-1">
              Resumen general de la tienda.
            </p>
          </div>

          <button
            onClick={logoutAdmin}
            className="bg-[#C8793D] hover:bg-[#AD6532] text-white px-5 py-2.5 rounded font-medium transition"
          >
            Cerrar sesión
          </button>

        </div>

        {/* Contenido */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">

          {/* Barra lateral */}
          <aside className="bg-white border border-[#E7E0D6] rounded-lg p-4">
            <SideBar />
          </aside>

          {/* Panel principal */}
          <main>

            <h2 className="text-xl font-semibold text-[#29241F] mb-5">
              Métricas generales
            </h2>

            {error && (
              <p className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {error}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Administradores */}
              <div className="bg-white border border-[#E7E0D6] rounded-lg p-6">
                <p className="text-gray-500 text-sm mb-2">
                  Administradores
                </p>

                <p className="text-3xl font-bold text-[#C8793D]">
                  {admin?.metricas.administradores ?? '-'}
                </p>
              </div>

              {/* Usuarios */}
              <div className="bg-white border border-[#E7E0D6] rounded-lg p-6">
                <p className="text-gray-500 text-sm mb-2">
                  Usuarios
                </p>

                <p className="text-3xl font-bold text-[#C8793D]">
                  {admin?.metricas.clientes ?? '-'}
                </p>
              </div>

            </div>

          </main>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
