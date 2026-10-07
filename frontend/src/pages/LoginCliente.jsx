import { useContext, useState } from 'react';
import AuthContext from '../components/AuthContext.jsx';
const LoginCliente = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginClient, loginError } = useContext(AuthContext)

    return (
        <div>
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
            <button onClick={() => loginClient(email, password)}>Login</button>
        </div>
    );
}

export default LoginCliente;