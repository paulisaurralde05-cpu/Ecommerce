import { useEffect, useState } from 'react'
import { getMetricas } from '../services/api';
import { useContext } from 'react';
import AuthContext from '../components/AuthContext.jsx';
import SideBar from '../components/SideBar.jsx';

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);
  const { logoutAdmin } = useContext(AuthContext);

  console.log("Admin:", admin);
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await getMetricas('admin');
        setAdmin(response.data);
      } catch (e) {
        setError(`Error: ${e.message}`)
        console.error(error)
      }
    }

    fetchPerfil();
  }, [])
  return (
    <div>
      <h1>
        AdminDashboard
      </h1>
      <SideBar />

      <p>Admins: {admin?.metricas.administradores}</p>
      <p>Clientes: {admin?.metricas.clientes}</p>
      <button onClick={logoutAdmin}>LOGOUT</button>
    </div>
  )
}

export default AdminDashboard
