
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function ClienteRoute({ children }) {

    const { clientAccessToken, isLoading } = useContext(AuthContext);

    // Esperar la recuperación de la sesión
    if (isLoading) {
        return <div>Cargando sesión...</div>;
    }

    // Si no existe una sesión de cliente
    if (!clientAccessToken) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ClienteRoute;
