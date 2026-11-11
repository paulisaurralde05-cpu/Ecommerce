
import { useState, useEffect, useContext } from 'react';
import { getUsuarios } from '../services/api.js';
import AuthContext from '../components/AuthContext.jsx';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const { adminAccessToken } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await getUsuarios(adminAccessToken);
        
        setUsuarios(response.data.data);

      } catch (error) {
        console.error(error);
        setError('No se pudieron obtener los usuarios.');
      } finally {
        setCargando(false);
      }
    };

    if (adminAccessToken) {
      fetchUsuarios();
    }
  }, [adminAccessToken]);

  return (
    <div className="min-h-screen bg-[#F7F4EF] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#29241F]">
            Usuarios
          </h1>

          <p className="text-gray-500 mt-1">
            Listado de usuarios registrados.
          </p>
        </div>

        <div className="bg-white border border-[#E7E0D6] rounded-lg shadow-sm overflow-hidden">

          {cargando ? (
            <p className="p-6 text-center text-gray-500">
              Cargando usuarios...
            </p>
          ) : error ? (
            <p className="p-6 text-center text-red-600">
              {error}
            </p>
          ) : usuarios.length === 0 ? (
            <p className="p-6 text-center text-gray-500">
              No hay usuarios registrados.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#29241F] text-white">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Nombre</th>
                    <th className="px-6 py-4">Email</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((usuario) => (
                    <tr
                      key={usuario.id}
                      className="border-b border-[#E7E0D6] hover:bg-[#F7F4EF] transition"
                    >
                      <td className="px-6 py-4 text-gray-600">
                        {usuario.id}
                      </td>

                      <td className="px-6 py-4 font-medium text-[#29241F]">
                        {usuario.nombre}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {usuario.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Usuarios;
