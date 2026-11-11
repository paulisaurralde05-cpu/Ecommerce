
import { useContext } from 'react'
import AuthContext from './AuthContext'
import { Link, useLocation } from 'react-router-dom';

function SideBar() {
    const { adminUser } = useContext(AuthContext)
    const role = adminUser?.role;
    const location = useLocation();

    const linkStyle = (ruta) => {
        return `block px-4 py-3 rounded transition ${location.pathname === ruta
                ? 'bg-[#C8793D] text-white font-semibold'
                : 'text-[#29241F] hover:bg-[#F7F4EF] hover:text-[#C8793D]'
            }`;
    };

    return (
        <aside className="w-full">

            <div className="mb-5 pb-4 border-b border-[#E7E0D6]">
                <h2 className="text-xl font-bold text-[#29241F]">
                    Bienvenido
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Panel de administración
                </p>
            </div>

            <nav className="flex flex-col gap-2">

                {role === "superadmin" && (
                    <Link
                        to="/admin/usuarios"
                        className={linkStyle('/admin/usuarios')}
                    >
                        Usuarios
                    </Link>
                )}

                {["superadmin", "gestor_productos"].includes(role) && (
                    <Link
                        to="/admin/productos"
                        className={linkStyle('/admin/productos')}
                    >
                        Productos
                    </Link>
                )}

                {["superadmin", "auditor"].includes(role) && (
                    <Link
                        to="/admin/reportes"
                        className={linkStyle('/admin/reportes')}
                    >
                        Reportes
                    </Link>
                )}

            </nav>

        </aside>
    )
}

export default SideBar;
