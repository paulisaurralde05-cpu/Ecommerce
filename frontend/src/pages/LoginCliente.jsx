
import { useContext, useState } from 'react';
import AuthContext from '../components/AuthContext.jsx';

const LoginCliente = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loginClient, loginError, isLoading } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white border border-[#E7E0D6] rounded-lg shadow-sm p-6 md:p-8">

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-[#29241F]">
                        Inicio de sesión
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
                        <p
                            role="alert"
                            className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-md"
                        >
                            {loginError}
                        </p>
                    )}

                    <button
                        onClick={() => loginClient(email, password)}
                        disabled={isLoading}
                        className="w-full bg-[#C8793D] hover:bg-[#AD6532] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md transition"
                    >
                        Iniciar sesión
                    </button>

                </div>

            </div>
        </div>
    );
};

export default LoginCliente;
