import jwt from 'jsonwebtoken';
import { JWT_SECRET_CLIENT, JWT_SECRET_ADMIN } from '../../utils/auth.js';
import Admin from '../models/admin.js'
import Cliente from '../models/cliente.js'

export const verifyToken = (secret) => (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                estado: false,
                message: 'no se proporcionó un token válido'
            })
        }
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, secret);

        console.log("TOKEN VALIDADO");
        console.log("PAYLOAD:", payload);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({
            estado: false,
            mensaje: 'token inválido',
            error: error.message,
        })
    }
}
export const verifyAdmin = (req, res, next) => {
    verifyToken(JWT_SECRET_ADMIN)(req, res, async (err) => {
        if (err) {
            return next(err);
        }
        try {
            if (!req.user || req.user.tipo !== 'admin') {
                return res.status(403).json({
                    estado: false, mensaje: 'acceso denegado'
                });
            }
            const adm = await Admin.findByPk(req.user.id);
            if (!adm) {
                return res.status(404).json({
                    estado: false,
                    mensaje: 'administrador no encontrado'
                })
            }

            // if(adm.nivelPermiso && adm.nivelPermiso.toLowerCase() !== 'superadmin' && adm.nivelPermiso && adm.nivelPermiso.toLowerCase() !== 'admin' ){
            //     return res.status(403).json({
            //         estado: false,
            //         mensaje: 'acceso denegado'
            //     })
            // }
            req.admin = adm;
            return next();
        } catch (error) {
            res.status(500).json({
                estado: false,
                mensaje: 'error interno del servidor',
                error: error.message,
            })
        }
    });
}
export const verifyClient = (req, res, next) => {
    verifyToken(JWT_SECRET_CLIENT)(req, res, async (err) => {
        if (err) {
            return next(err);
        }
        try {
            if (!req.user || req.user.tipo !== 'cliente') {
                return res.status(403).json({
                    estado: false, mensaje: 'acceso denegado'
                });
            }

            const cliente = await Cliente.findByPk(req.user.id, {
                attributes: {
                    exclude: ['password']
                }
            });
            console.log(req.user.id);
            if (!cliente) {
                return res.status(404).json({
                    estado: false,
                    mensaje: 'cliente no encontrado'
                })
            }
            req.cliente = cliente;
            return next();

        } catch (error) {
            res.status(500).json({
                estado: false,
                mensaje: 'error interno de servidor',
                error: error.message,
            })
        }
    });
}