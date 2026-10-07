import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function ClienteRoute({ children }) {

    const { clientAccessToken } = useContext(AuthContext);
    if (!clientAccessToken) {
        return <Navigate to="/" replace />
    }
    return children;
}

export default ClienteRoute
