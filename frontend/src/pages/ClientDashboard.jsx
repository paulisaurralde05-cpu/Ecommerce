
import { useEffect, useState, useContext } from "react";
import { getPerfil } from "../services/api";
import AuthContext from "../components/AuthContext";

function ClientDashboard() {
  const [clienteUser, setClienteUser] = useState(null);
  const { logoutClient, clientAccessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await getPerfil('client', clientAccessToken);
        setClienteUser(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPerfil();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F4EF] p-4 md:p-8">

      <div className="max-w-5xl mx-auto">

        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#29241F]">
            Mi cuenta
          </h1>

          <p className="text-gray-500 mt-1">
            Bienvenido a tu espacio personal.
          </p>
        </div>

        {/* Tarjeta de perfil */}
        <div className="bg-white border border-[#E7E0D6] rounded-lg shadow-sm overflow-hidden">

          <div className="bg-[#29241F] px-6 py-5">
            <h2 className="text-xl font-semibold text-white">
              Información de mi perfil
            </h2>
          </div>

          <div className="p-6">

            <div className="mb-5">
              <p className="text-sm text-gray-500 mb-1">
                Nombre
              </p>

              <p className="text-lg font-medium text-[#29241F]">
                {clienteUser ? clienteUser.nombre : "Cargando..."}
              </p>
            </div>

            <div className="border-t border-[#E7E0D6] pt-5">
              <p className="text-sm text-gray-500 mb-1">
                Correo electrónico
              </p>

              <p className="text-lg font-medium text-[#29241F] break-all">
                {clienteUser ? clienteUser.email : "Cargando..."}
              </p>
            </div>

            <div className="border-t border-[#E7E0D6] mt-5 pt-5 flex justify-end">

              <button
                onClick={logoutClient}
                className="bg-[#C8793D] hover:bg-[#AD6532] text-white px-5 py-2.5 rounded font-medium transition"
              >
                Cerrar sesión
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ClientDashboard;
