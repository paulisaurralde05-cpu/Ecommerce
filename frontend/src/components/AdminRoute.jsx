
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function AdminRoute({ children }) {
    const { adminAccessToken, isLoading } = useContext(AuthContext);

    // Esperar a que AuthProvider termine de recuperar la sesión
    if (isLoading) {
        return <div>Cargando sesión...</div>;
    }

    // Si no existe una sesión de administrador
    if (!adminAccessToken) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminRoute;
