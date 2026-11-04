import { useState, useContext } from 'react';
import AuthContext from '../components/AuthContext.jsx';
const LoginAdmin = () => {
    const {
        loginAdm,
        loginError,
        clientAccessToken,
        clientRefreshToken,
        logoutClient,
        isLoading
    } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const tieneSesionCliente = clientAccessToken || clientRefreshToken;
    return (
        <div className='login'>
            {isLoading && <p>Comprobando sesión...</p>}
            {tieneSesionCliente && (
                <div className="advertencia-sesion">
                    <h2>Sesión de Cliente activa</h2>
                    <p>
                        Ya posee una sesión de Cliente activa.
                        Para ingresar al panel de Administración,
                        debe cerrar su sesión actual.
                    </p>
                    <button onClick={() => logoutClient(true)}>
                        Cerrar sesión de Cliente y continuar
                    </button>
                </div>
            )}
            <h2>Inicio de sesión admin</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loginError && <p role="alert">{loginError}</p>}
            <button onClick={() => loginAdm(email, password)}>Login</button>
        </div>
    );
}

export default LoginAdmin;