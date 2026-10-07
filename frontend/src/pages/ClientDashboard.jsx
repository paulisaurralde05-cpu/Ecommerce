import { useEffect, useState } from "react"
import { getPerfil } from "../services/api";
import { useContext } from 'react';
import AuthContext from '../components/AuthContext';

function ClientDashboard() {
  const [clienteUser, setclienteUser] = useState(null);
  const { logoutClient } = useContext(AuthContext);
  console.log("clienteUser:", clienteUser);
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await getPerfil('client');
        setclienteUser(response.data);
        console.log(response)
      } catch (e) {
        console.error(e)
      }
    }

    fetchPerfil();
  }, [])

  return (
    <div>
      <h1>Bienvenido {clienteUser ? clienteUser.nombre : ""}</h1>
      <p>email: {clienteUser ? clienteUser.email : ""}</p>
      <button onClick={logoutClient}>LOGOUT</button>
    </div>
  )
}

export default ClientDashboard
