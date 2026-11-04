import 'dotenv/config';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';
import Cliente from '../models/cliente.js';
import Sesion from '../models/sesion.js';

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({
            estado: false,
            mensaje: 'Refresh Token obligatorio'
        });
    }

    try {

        // 1. Verificar firma y vencimiento del Refresh Token
        const payload = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const sesion = await Sesion.findOne({
            where: {
                refreshToken,
                userId: payload.id,
                userType: payload.tipo
            }
        });

        // 2. Comprobar que el token exista en la base de datos

        if (!sesion) {
            return res.status(401).json({
                estado: false,
                mensaje: 'Sesion inexistente o invalida'
            });
        }

        // 3. Comprobar vencimiento de la sesión en la BD
        if (new Date(sesion.expiresAt) <= new Date()) {
            await sesion.destroy();

            return res.status(401).json({
                estado: false,
                mensaje: 'La sesion ha expirado'
            })
        }

        // 4. Identificar el tipo de Usuario
        let accessToken;
        if (payload.tipo === 'client') {
            // Buscar Cliente

            const cliente = await Cliente.findByPk(payload.id);

            if (!cliente) {
                await sesion.destroy();

                return res.status(401).json({
                    estado: false,
                    mensaje: 'Cliente inexistente'
                });
            }

            // Generar Access Token cliente 
            accessToken = jwt.sign(
                {
                    id: cliente.id,
                    tipo: 'client'
                },
                process.env.JWT_SECRET_CLIENT,
                { expiresIn: '15m' }
            )
        } else if (payload.tipo === 'admin') {
            // Buscar Administrador
            const admin = await Admin.findByPk(payload.id);

            if (!admin) {
                await sesion.destroy();
                return res.status(401).json({
                    estado: false,
                    mensaje: 'Admministrador inexistente'
                });
            }

            accessToken = jwt.sign(
                {
                    id: admin.id,
                    tipo: 'admin',
                    role: admin.role
                },
                process.env.JWT_SECRET_ADMIN,
                { expiresIn: '15m' }
            );
        } else {
            return res.status(401).json({
                estado: false,
                mensaje: 'Tipo de usuario inválido'
            });
        }
        // 5. Devolver nuevo Access Token
        return res.status(200).json({
            estado: true,
            mensaje: 'Token renovado correctamente',
            accessToken
        });
    } catch (error) {
        return res.status(401).json({
            estado: false,
            mensaje: 'Refresh Token inválido o expirado'
        });
    }
}

export const logout = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({
            mensaje: 'refresh token no encontrado'
        });
    }
    try {
        const sesion = await Sesion.findOne({
            where: {
                refreshToken: refreshToken
            }
        });
        if (!sesion) {
            return res.status(404).json({
                mensaje: 'refresh token no encontrado'
            });
        }
        sesion.destroy();
        return res.status(200).json({
            mensaje: 'Sesión cerrada correctamente'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensaje: 'Error interno del servidor',
            error: error.message,
        });

    }

}