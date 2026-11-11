
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
        <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white border border-[#E7E0D6] rounded-lg shadow-sm p-6 md:p-8">

                {isLoading && (
                    <p className="text-center text-gray-500 mb-4">
                        Comprobando sesión...
                    </p>
                )}

                {tieneSesionCliente && (
                    <div className="bg-amber-50 border border-amber-300 rounded-md p-4 mb-6">
                        <h2 className="text-lg font-semibold text-amber-800 mb-2">
                            Sesión de Cliente activa
                        </h2>

                        <p className="text-sm text-amber-700 mb-4">
                            Ya posee una sesión de Cliente activa.
                            Para ingresar al panel de Administración,
                            debe cerrar su sesión actual.
                        </p>

                        <button
                            onClick={() => logoutClient(true)}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition"
                        >
                            Cerrar sesión de Cliente y continuar
                        </button>
                    </div>
                )}

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-[#29241F]">
                        Inicio de sesión administrador
                    </h1>
                </div>

                <div className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-[#29241F] mb-1">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingrese su email"
                            className="w-full border border-[#E7E0D6] rounded-md px-3 py-2.5 text-[#29241F] outline-none focus:ring-2 focus:ring-[#C8793D] focus:border-[#C8793D]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#29241F] mb-1">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingrese su contraseña"
                            className="w-full border border-[#E7E0D6] rounded-md px-3 py-2.5 text-[#29241F] outline-none focus:ring-2 focus:ring-[#C8793D] focus:border-[#C8793D]"
                        />
                    </div>

                    {loginError && (
                        <p role="alert" className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-md">
                            {loginError}
                        </p>
                    )}

                    <button
                        onClick={() => loginAdm(email, password)}
                        disabled={isLoading || tieneSesionCliente}
                        className="w-full bg-[#C8793D] hover:bg-[#AD6532] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md transition"
                    >
                        Iniciar sesión
                    </button>

                </div>

            </div>
        </div>
    );
};

export default LoginAdmin;
