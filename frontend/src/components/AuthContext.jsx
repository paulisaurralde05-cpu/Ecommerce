import { loginCliente, loginAdmin } from '../services/api.js'
import { createContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 
    // Sesion cliente
    // 

    const [clientUser, setClientUser] = useState(() => {
        const storedUser = localStorage.getItem("clientUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [clientAccessToken, setClientAccessToken] = useState(localStorage.getItem("clientAccessToken"));

    const [clientRefreshToken, setClientRefreshToken] = useState(localStorage.getItem("clientRefreshToken"));

    // 
    // Sesion Admin
    // 
    const [adminUser, setAdminUser] = useState(() => {
        const storedUser = localStorage.getItem("adminUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [adminAccessToken, setAdminAccessToken] = useState(localStorage.getItem("adminAccessToken"));
    const [adminRefreshToken, setAdminRefreshToken] = useState(localStorage.getItem("adminRefreshToken"));



    const [userType, setUserType] = useState(localStorage.getItem("userType"));
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();

    const loginClient = async (email, password) => {

        setLoginError("");
        setIsLoading(true);
        try {
            const response = await loginCliente('client', { email, password });
            const {
                accessToken,
                refreshToken
            } = response.data;

            setClientUser(response.data);
            setClientAccessToken(accessToken);
            setClientRefreshToken(refreshToken);
            localStorage.setItem("clientUser", JSON.stringify(response.data));
            localStorage.setItem("clientAccessToken", accessToken);
            localStorage.setItem("clientRefreshToken", refreshToken);

            navigate('/client/dashboard');
        } catch (error) {
            console.error('ERROR AL INICIAR SESIÓN: ' + error.message);
            setLoginError(error.response?.data?.mensaje || error.response?.data?.message || error.response?.data?.error || error.message);
        } finally {
            setIsLoading(false);
        }
    }
    const loginAdm = async (email, password) => {

        setLoginError("");
        setIsLoading(true);
        try {
            const response = await loginAdmin('admin', { email, password });
            const {
                accessToken,
                refreshToken,
                role
            } = response.data;
            const adminData = { ...response.data, role };

            setAdminUser(adminData);
            setAdminAccessToken(accessToken);
            setAdminRefreshToken(refreshToken);
            localStorage.setItem("adminUser", JSON.stringify(adminData));
            localStorage.setItem("adminAccessToken", accessToken);
            localStorage.setItem("adminRefreshToken", refreshToken);

            navigate('/admin/dashboard');

        } catch (error) {
            console.error('ERROR AL INICIAR SESIÓN: ' + error.message);
            setLoginError(error.response?.data?.mensaje || error.response?.data?.message || error.response?.data?.error || error.message);
        } finally {
            setIsLoading(false);
        }
    }
    const logoutClient = () => {
        localStorage.removeItem("clientUser");
        localStorage.removeItem("clientAccessToken");
        localStorage.removeItem("clientRefreshToken");
        setClientAccessToken(null);
        setClientRefreshToken(null);
        setClientUser(null);

        navigate('/');

    }
    const logoutAdmin = () => {
        localStorage.removeItem("adminUser");
        localStorage.removeItem("adminAccessToken");
        localStorage.removeItem("adminRefreshToken");
        setAdminAccessToken(null);
        setAdminRefreshToken(null);
        setAdminUser(null);

        navigate('/');

    }


    return (
        <AuthContext.Provider value={{
            clientUser,
            clientAccessToken,
            clientRefreshToken,
            adminUser,
            adminAccessToken,
            adminRefreshToken,
            isLoading,
            loginError,
            loginClient,
            loginAdm,
            logoutClient,
            logoutAdmin
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
