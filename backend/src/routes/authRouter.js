import express from 'express';
import { refreshToken, logout } from '../controllers/clienteController.js'

const router = express.Router();

router.post('/refresh', refreshToken);
router.post('/logout', logout)
export default router;