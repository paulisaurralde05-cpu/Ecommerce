
import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import AuthContext from './AuthContext.jsx'
import ThemeContext from './ThemeContext.jsx'

const Header = () => {
    const {
        clientAccessToken,
        adminAccessToken,
        adminUser,
        isLoading,
        logoutClient,
        logoutAdmin,
    } = useContext(AuthContext);

    const { theme, toggleTheme } = useContext(ThemeContext);

    const [menuAbierto, setMenuAbierto] = useState(false);

    const esCliente = !!clientAccessToken;
    const esAdmin = !!adminAccessToken;

    const rolAdmin = adminUser?.role;

    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    return (
        <header className="w-full bg-white text-[#29241F] border-b border-[#E7E0D6] dark:bg-[#24211E] dark:text-white dark:border-[#44403C]">

            {/* Barra principal */}
            <div className="flex items-center justify-between px-4 py-4 md:px-8">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={cerrarMenu}
                    className="text-xl font-semibold text-[#C8793D]"
                >
                    El Arpa de David
                </Link>

                {/* Botón hamburguesa: solo móvil */}
                <button
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    className="md:hidden border border-[#E7E0D6] px-3 py-2 rounded"
                    aria-label="Abrir menú"
                >
                    {menuAbierto ? '✕' : '☰'}
                </button>

                {/* Navegación */}
                <nav className={`${menuAbierto ? 'flex' : 'hidden'} md:flex absolute md:static top-[60px] left-0 w-full md:w-auto flex-col md:flex-row items-start md:items-center gap-4 p-5 md:p-0 bg-white dark:bg-[#24211E] border-b md:border-0 border-[#E7E0D6] dark:border-[#44403C] z-10`}>

                    {!isLoading && (
                        <>
                            {/* VISITANTE */}
                            {!esCliente && !esAdmin && (
                                <>
                                    <NavLink
                                        to="/"
                                        onClick={cerrarMenu}
                                        className="hover:text-[#C8793D]"
                                    >
                                        Inicio
                                    </NavLink>

                                    <NavLink
                                        to="/login"
                                        onClick={cerrarMenu}
                                        className="hover:text-[#C8793D]"
                                    >
                                        Iniciar sesión
                                    </NavLink>

                                    <NavLink
                                        to="/admin/login"
                                        onClick={cerrarMenu}
                                        className="hover:text-[#C8793D]"
                                    >
                                        Acceso administrador
                                    </NavLink>
                                </>
                            )}

                            {/* CLIENTE */}
                            {esCliente && !esAdmin && (
                                <>
                                    <NavLink
                                        to="/"
                                        onClick={cerrarMenu}
                                        className="hover:text-[#C8793D]"
                                    >
                                        Inicio
                                    </NavLink>
                                    
                                    <NavLink
                                        to="/client/dashboard"
                                        onClick={cerrarMenu}
                                        className="hover:text-[#C8793D]"
                                    >
                                        Mi Perfil
                                    </NavLink>

                                    <button
                                        onClick={() => {
                                            cerrarMenu();
                                            logoutClient();
                                        }}
                                        className="text-left hover:text-[#C8793D]"
                                    >
                                        Cerrar sesión
                                    </button>
                                </>
                            )}

                            {/* ADMINISTRADOR */}
                            {esAdmin && !esCliente && (
                                <>
                                    <NavLink
                                        to="/admin/dashboard"
                                        onClick={cerrarMenu}
                                        className="hover:text-[#C8793D]"
                                    >
                                        Panel
                                    </NavLink>

                                    {rolAdmin === 'superadmin' && (
                                        <NavLink
                                            to="/admin/usuarios"
                                            onClick={cerrarMenu}
                                            className="hover:text-[#C8793D]"
                                        >
                                            Usuarios
                                        </NavLink>
                                    )}

                                    {(rolAdmin === 'superadmin' ||
                                        rolAdmin === 'gestor_productos') && (
                                            <NavLink
                                                to="/admin/productos"
                                                onClick={cerrarMenu}
                                                className="hover:text-[#C8793D]"
                                            >
                                                Productos
                                            </NavLink>
                                        )}

                                    {(rolAdmin === 'superadmin' ||
                                        rolAdmin === 'auditor') && (
                                            <NavLink
                                                to="/admin/reportes"
                                                onClick={cerrarMenu}
                                                className="hover:text-[#C8793D]"
                                            >
                                                Reportes
                                            </NavLink>
                                        )}

                                    <button
                                        onClick={() => {
                                            cerrarMenu();
                                            logoutAdmin();
                                        }}
                                        className="text-left hover:text-[#C8793D]"
                                    >
                                        Cerrar sesión
                                    </button>
                                </>
                            )}

                            {/* CONFLICTO DE SESIONES */}
                            {esCliente && esAdmin && (
                                <span>
                                    Conflicto de sesiones
                                </span>
                            )}
                        </>
                    )}

                    {/* Cambiar tema */}
                    <button
                        onClick={toggleTheme}
                        className="border border-[#E7E0D6] dark:border-[#57534E] px-3 py-2 rounded hover:text-[#C8793D]"
                    >
                        {theme === 'light' ? '🌙 Modo oscuro' : '☀️ Modo claro'}
                    </button>

                </nav>
            </div>
        </header>
    );
}

export default Header;
