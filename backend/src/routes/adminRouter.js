import express from 'express';
import { loginAdmin, obtenerMetricas, obtenerUsuarios, obtenerReportes } from '../controllers/adminController.js';
import { verifyAdmin } from '../middleware/auth.js';
import checkAdminRole from '../middleware/checkAdmin.js';


const router = express.Router();

router.post('/login', loginAdmin);
router.get('/metricas', verifyAdmin, obtenerMetricas);
router.get('/usuarios', verifyAdmin, checkAdminRole(['superadmin']), obtenerUsuarios);
router.get('/reportes', verifyAdmin, checkAdminRole(['superadmin', 'auditor']), obtenerReportes);
export default router;