import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import LoginAdmin from './pages/LoginAdmin.jsx';
import LoginCliente from './pages/LoginCliente.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx'
import ClientDashboard from './pages/ClientDashboard.jsx'
import ClienteRoute from './components/ClienteRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import AdminRoleGuard from './components/AdminRoleGuard.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import Usuarios from './adminPages/Usuarios.jsx';
import Productos from './adminPages/Productos.jsx';
import Reportes from './adminPages/Reportes.jsx';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/admin/login' element={<LoginAdmin />} />
      <Route path='/login' element={<LoginCliente />} />
      <Route path='/client/dashboard'
        element={
          <ClienteRoute>
            <ClientDashboard />
          </ClienteRoute>
        }
      />
      <Route path='/admin/dashboard'
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route path='/admin/usuarios' element={
        <AdminRoute>
          <AdminRoleGuard allowedRoles={["superadmin"]}>
            <Usuarios />
          </AdminRoleGuard>
        </AdminRoute>
      } />

      <Route path='/admin/productos' element={
        <AdminRoute>
          <AdminRoleGuard allowedRoles={["superadmin", "gestor_productos"]}>
            <Productos />
          </AdminRoleGuard>
        </AdminRoute>
      } />

      <Route path='/admin/reportes' element={
        <AdminRoute>
          <AdminRoleGuard allowedRoles={["superadmin", "auditor"]}>
            <Reportes />
          </AdminRoleGuard>
        </AdminRoute>
      } />
      <Route path='/unauthorized' element={<Unauthorized />} />



    </Routes>
  )
}

export default App
