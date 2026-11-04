import { useContext } from 'react'
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

    const esCliente = !!clientAccessToken
    const esAdmin = !!adminAccessToken

    const rolAdmin = adminUser?.role;

    return (
        <header className={`header ${theme}`}>

            <div className="header-logo">
                <Link to="/">
                    Mi Ecommerce
                </Link>
            </div>

            <nav className="header-nav">

                <NavLink to="/">
                    Inicio
                </NavLink>

                {!isLoading && (
                    <>
                        {/* VISITANTE */}
                        {!esCliente && !esAdmin && (
                            <>
                                <NavLink to="/login">
                                    Iniciar sesión
                                </NavLink>

                                <NavLink to="/admin/login">
                                    Acceso administrador
                                </NavLink>
                            </>
                        )}

                        {/* CLIENTE */}
                        {esCliente && !esAdmin && (
                            <>
                                <NavLink to="/client/dashboard">
                                    Mi panel
                                </NavLink>

                                <button onClick={logoutClient}>
                                    Cerrar sesión
                                </button>
                            </>
                        )}

                        {/* ADMINISTRADOR */}
                        {esAdmin && !esCliente && (
                            <>
                                <NavLink to="/admin/dashboard">
                                    Panel
                                </NavLink>

                                {rolAdmin === 'superadmin' && (
                                    <NavLink to="/admin/usuarios">
                                        Usuarios
                                    </NavLink>
                                )}

                                {(rolAdmin === 'superadmin' ||
                                    rolAdmin === 'gestor_productos') && (
                                        <NavLink to="/admin/productos">
                                            Productos
                                        </NavLink>
                                    )}

                                {(rolAdmin === 'superadmin' ||
                                    rolAdmin === 'auditor') && (
                                        <NavLink to="/admin/reportes">
                                            Reportes
                                        </NavLink>
                                    )}

                                <button onClick={logoutAdmin}>
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

            </nav>

            <button onClick={toggleTheme}>
                {theme === 'light' ? '🌙 Modo oscuro' : '☀️ Modo claro'}
            </button>

        </header>
    );
}

export default Header
