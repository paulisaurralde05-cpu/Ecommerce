import express from 'express';
import { loginAdmin, obtenerMetricas, obtenerUsuarios, createProductos, obtenerReportes } from '../controllers/adminController.js';
import { verifyAdmin } from '../middleware/auth.js';
import checkAdminRole from '../middleware/checkAdmin.js';


const router = express.Router();

router.post('/', loginAdmin);
router.get('/metricas', verifyAdmin, obtenerMetricas);
router.get('/usuarios', verifyAdmin, checkAdminRole(['superadmin']), obtenerUsuarios);
router.post('/productos', verifyAdmin, checkAdminRole(['superadmin', 'gestor_productos']), createProductos);
router.get('/reportes', verifyAdmin, checkAdminRole(['superadmin', 'auditor']), obtenerReportes);
export default router;