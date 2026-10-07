import { Link, Navigate} from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../components/AuthContext'
function Home() {
  const { adminAccessToken, clientAccessToken } = useContext(AuthContext)
  return (
    <div>
      {adminAccessToken? <Navigate to="/admin/dashboard" /> : null}
      {clientAccessToken? <Navigate to="/client/dashboard" /> : null}
      <h1>HOME</h1>
      <Link to={'/admin/login'}>Login Admin</Link> <br />
      <Link to={'login'}>Login Client</Link>
    </div>
  )
}

export default Home
