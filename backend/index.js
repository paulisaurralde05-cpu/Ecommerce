import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import clienteRouter from './src/routes/clienteRouter.js'
import adminRouter from './src/routes/adminRouter.js'
import productRouter from './src/routes/productRouter.js'
import authRouter from './src/routes/authRouter.js';
import sequelize from './config/database.js';
import Sesion from './src/models/sesion.js';
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use('/api/client', clienteRouter);
app.use('/api/admin', adminRouter);
app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);

try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
} catch (error) {
    console.error('no se pudo conectar a la base de datos:', error);
}