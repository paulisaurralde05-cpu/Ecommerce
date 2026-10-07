import Admin from '../models/admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cliente from '../models/cliente.js';
import Sesion from '../models/sesion.js';

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y password son obligatorios' })
    }
    try {
        const admin = await Admin.findOne({ where: { email } })

        if (!admin || !bcrypt.compareSync(password, admin.password)) {
            return res.status(401).json({ error: 'credenciales invalidas' })
        }
        const accessToken = jwt.sign({ id: admin.id, tipo: 'admin', role: admin.role },
            process.env.JWT_SECRET_ADMIN,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign({ id: admin.id, tipo: 'admin', role: admin.role },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );
        await Sesion.create({
            userId: admin.id,
            userType: 'admin',
            refreshToken: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });


        return res.status(200).json({ mensaje: 'admin logueado correctamente', accessToken, refreshToken, role: admin.role });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
export const obtenerMetricas = async (req, res) => {
    try {
        const cantidadAdmins = await Admin.count();
        const cantidadClientes = await Cliente.count();

        return res.status(200).json({
            estado: true,
            metricas: {
                administradores: cantidadAdmins,
                clientes: cantidadClientes,
            }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor', mensaje: error.message })

    }
}
export const obtenerUsuarios = async (req, res) => {
    return res.status(200).json({ message: 'usuarios' });
}
export const createProductos = async (req, res) => {
    return res.status(200).json({ message: 'productos' });
}
export const obtenerReportes = async (req, res) => {
    return res.status(200).json({ message: 'reportes' });
}
// export const logoutAdmin = async (req, res) => {

//     const { refreshToken } = req.body;
//     if (!refreshToken) {
//         return res.status(400).json({
//             mensaje: 'refresh token no encontrado'
//         });
//     }
//     try {
//         const sesion = await Sesion.findOne({
//             where:{
//                 refreshToken: refreshToken
//             }
//         });
//         if (!sesion){
//             return res.status(400).json({
//                 mensaje: 'refresh token no encontrado'
//             });
//         }

//         await sesion.destroy();
//         return res.status(200).json({
//             mensaje: 'Sesión cerrada correctamente'
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             mensaje: 'Error interno del servidor',
//             error: error.message,
//         })
//     }
// }
