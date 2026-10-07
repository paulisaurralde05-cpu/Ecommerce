import express from 'express'
import { getPerfilCliente, loginCliente } from '../controllers/clienteController.js'
import { verifyClient } from '../middleware/auth.js'
const router = express.Router();

// router.post('/', registerCliente)
router.post('/login', loginCliente)
router.get('/perfil', verifyClient, getPerfilCliente)

export default router;