import { Link, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../components/AuthContext'
import ThemeContext from '../components/ThemeContext'
import Productos from '../adminPages/Productos'
function Home() {
  const { adminAccessToken, clientAccessToken } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      {adminAccessToken ? <Navigate to="/admin/dashboard" /> : null}
      {clientAccessToken ? <Navigate to="/client/dashboard" /> : null}
      <h1 className='color-red'>HOME</h1>

      <Productos></Productos>
    </div>
  )
}

export default Home
