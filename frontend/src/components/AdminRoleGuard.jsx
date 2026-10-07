import { useContext } from 'react'
import AuthContext  from '../components/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

function AdminRoleGuard({ allowedRoles, children }) {
    const { adminUser } = useContext(AuthContext);

    const role = adminUser?.role;

    if(!allowedRoles.includes(role)){
        return <Navigate to="/unauthorized" />;
    }
    return children;
}


export default AdminRoleGuard;
