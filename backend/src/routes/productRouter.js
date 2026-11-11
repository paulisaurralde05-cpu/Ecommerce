import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { verifyAdmin } from '../middleware/auth.js';
import checkAdminRole from '../middleware/checkAdmin.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', verifyAdmin, checkAdminRole(['superadmin', 'gestor_productos']), createProduct);
router.put('/:id', verifyAdmin, updateProduct);
router.delete('/:id', verifyAdmin, deleteProduct);

export default router;