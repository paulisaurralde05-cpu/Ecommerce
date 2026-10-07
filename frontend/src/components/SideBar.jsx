import { useContext } from 'react'
import AuthContext from './AuthContext'
import { Link } from 'react-router-dom';
function SideBar() {
    const { adminUser } = useContext(AuthContext)
    const role = adminUser?.role;
    return (
        <aside>
            <h2>Panel Admin</h2>

            {role === "superadmin" && (
                <Link to="/admin/usuarios">
                    Usuarios
                </Link>
            )}
            {["superadmin", "gestor_productos"].includes(role) && (
                <Link to="/admin/productos">
                    Productos
                </Link>
            )}
            {["superadmin", "auditor"].includes(role) && (
                <Link to="/admin/reportes">
                    Reportes
                </Link>
            )}
        </aside>
    )
}

export default SideBar
