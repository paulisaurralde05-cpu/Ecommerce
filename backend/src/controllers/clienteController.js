import Cliente from '../models/cliente.js'
import Sesion from '../models/sesion.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginCliente = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: 'Email y password son obligatorios' })
    }
    try {
        const cliente = await Cliente.findOne({ where: { email } })

        if (!cliente || !bcrypt.compareSync(password, cliente.password)) {
            return res.status(401).json({ mensaje: 'credenciales invalidas' })
        }
        const accessToken = jwt.sign(
            { id: cliente.id, tipo: 'cliente' },
            process.env.JWT_SECRET_CLIENT,
            { expiresIn: '15m' }
        )
        const refreshToken = jwt.sign(
            { id: cliente.id, tipo: 'cliente' },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        )

        await Sesion.create({
            userId: cliente.id,
            userType: 'client',
            refreshToken: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        return res.status(200).json({ mensaje: 'Cliente logueado correctamente', accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
    }
}

export const registerCliente = async (req, res) => {
    try {
        const { id, nombre, email, password } = req.body
        const newCliente = await Cliente.create({ id, nombre, email, password })
        res.status(201).json(newCliente);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getPerfilCliente = async (req, res) => {
    try {
        const cliente = req.cliente;
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' })
        }
        res.status(200).json(cliente)
    } catch (error) {
        res.status(500).json({ details: error.message })
    }
}

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({
            mensaje: 'Refresh token requerido'
        });
    }
    try {
        const sesion = await Sesion.findOne({
            where: {
                refreshToken: refreshToken
            }
        });
        if (!sesion) {
            return res.status(401).json({
                mensaje: 'Refresh token inválido'
            });
        }
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );
        let secret;
        if (sesion.userType === 'client') {
            secret = process.env.JWT_SECRET_CLIENT;
        } else if(sesion.userType === 'admin'){
            secret = process.env.JWT_SECRET_ADMIN;
        }else{
            return res.status(400).json({
                mensaje: 'Tipo de usuario invalido'
            })
        }
        const accessToken = jwt.sign(
            {
                id: decoded.id,
                tipo: decoded.tipo,
                ...(decoded.tipo === 'admin' && {
                    role: decoded.role,
                })
            },
            secret,
            { expiresIn: '15m' }
        );
        return res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensaje: 'Refresh token inválido o expirado',
            error: error.message,
        })
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