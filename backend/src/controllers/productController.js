import Product from "../models/product.js";
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1)
        const limit = Math.max(1, parseInt(req.query.limit, 10) || 5)
        const offset = (page - 1) * limit;
        const where = {};
        const { busqueda, category } = req.query;

        if (busqueda) {
            where[Op.or] = [
                { name: { [Op.like]: `%${busqueda}%` } },
            ]
        }
        if (category) {
            where.category = category;
        }

        const camposPermitidos = ["name", "price"];
        const ordenesPermitidos= ["ASC", "DESC"];
        const sortBy = camposPermitidos.includes(req.query.sortBy) ? req.query.sortBy : "name";
        const order = ordenesPermitidos.includes(req.query.order) ? req.query.order : "ASC";
        

        const { count, rows } = await Product.findAndCountAll({
            where,
            limit: limit,
            offset,
            distinct: true,
            order: [[sortBy, order]]
        });
        const totalPaginas = Math.ceil(count / limit) || 1;
        res.json({
            estado: true,
            data: {
                products: rows,
                total: count,
                page,
                limit,
                totalPaginas,
            }
        })


    } catch (error) {
        console.error('Error al buscar', error);
        res.status(500).json({
            estado: false,
            mensaje: error.message,
        })
    }
}
export const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            estado: true,
            data: newProduct
        })
    } catch (error) {
        console.error('Error al crear', error);
        res.status(500).json({
            estado: false,
            mensaje: error.message,
        });
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const prod = await Product.findByPk(id);
        if (!prod) {
            return res.status(404).json({
                estado: false,
                mensaje: 'Producto no encontrado',
            })
        }
        await prod.update(req.body);
        console.log(req.body)
        res.json({
            estado: true,
            data: prod
        })
    } catch (error) {
        res.status(500).json({
            estado: false,
            mensaje: error.message,
        });
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const prod = await Product.findByPk(id);
        if (!prod) {
            return res.status(404).json({
                estado: false,
                mensaje: 'Producto no encontrado',
            })
        }
        await prod.destroy();
        res.json({
            estado: true,
            mensaje: 'Producto eliminado correctamente'
        })
    } catch (error) {
        res.status(500).json({
            estado: false,
            mensaje: error.message,
        });
    }
}