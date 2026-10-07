import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function AdminRoute({ children }) {
    const { adminAccessToken } = useContext(AuthContext);

     console.log("AdminRoute:", { adminAccessToken });
    if (!adminAccessToken) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default AdminRoute
