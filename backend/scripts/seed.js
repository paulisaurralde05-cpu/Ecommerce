import 'dotenv/config';
import Admin from '../src/models/admin.js';
import Cliente from '../src/models/cliente.js';
import Product from '../src/models/product.js';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt';

const passwordHash = await bcrypt.hash('pass', 10)
const seedAdmin = [
    {
        nombre: 'Pepe',
        email: 'pepe@example.com',
        password: passwordHash,
        role: 'gestor_productos'
    },
    {
        nombre: 'pepo',
        email: 'pepo@example.com',
        password: passwordHash,
        role: 'auditor'
    },
    {
        nombre: 'pipo',
        email: 'pipo@example.com',
        password: passwordHash,
        role: 'superadmin'
    },
]
const seedCliente = {
    nombre: 'juan',
    email: 'juan@example.com',
    password: passwordHash
}

const productosSeed = [
    {
        name: 'Procesador AMD Ryzen 3 4100',
        price: 96500.00,
        stock: 15,
        category: 'Procesadores',
    },
    {
        name: 'Intel Core i9-14900Kf',
        price: 1798170.00,
        stock: 4,
        category: 'Procesadores',
    },
    {
        name: 'Placa de Video ASUS RTX 4070 Dual 12GB',
        price: 850000.00,
        stock: 8,
        category: 'Placas de video',
    },
    {
        name: 'Procesador AMD Ryzen 5 5600X',
        price: 245000.00,
        stock: 20,
        category: 'Procesadores',
    },
    {
        name: 'Motherboard ASUS Prime B550M-A',
        price: 135000.00,
        stock: 12,
        category: 'Motherboards',
    },
    {
        name: 'Motherboard Gigabyte Z790 AORUS ELITE',
        price: 410000.00,
        stock: 6,
        category: 'Motherboards',
    },
    {
        name: 'Placa de Video AMD Radeon RX 7600 XT 16GB',
        price: 495000.00,
        stock: 10,
        category: 'Placas de video',
    },
    {
        name: 'Memoria RAM DDR5 16GB Corsair Vengeance',
        price: 89000.00,
        stock: 25,
        category: 'Memorias',
    },
    {
        name: 'Disco SSD NVMe M.2 1TB WD Black SN770',
        price: 105000.00,
        stock: 40,
        category: 'Almacenamiento',
    },
    {
        name: 'Fuente Corsair RM750e 750W',
        price: 185000.00,
        stock: 14,
        category: 'Fuentes',
    },
    {
        name: 'Gabinete Lian Li Lancool 216 RGB',
        price: 140000.00,
        stock: 9,
        category: 'Gabinetes',
    },
    {
        name: 'Memoria RAM DDR4 32GB Kingston Fury',
        price: 112000.00,
        stock: 30,
        category: 'Memorias',
    }
];


const runseed = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida')
        await sequelize.sync({ force: true });
        console.log('Tablas sincronizadas correctamente');

        for (const adm of seedAdmin) {
            const [admin, created] = await Admin.findOrCreate({
                where: { email: adm.email },
                defaults: adm,
            })
            console.log(created ? `Admin ${admin.nombre}` : `ya existe`)
        }

        for (const cli of [seedCliente]) {
            const [cliente, created] = await Cliente.findOrCreate({
                where: { email: cli.email },
                defaults: cli,
            })
            console.log(created ? `Cliente ${cliente.nombre}` : `ya existe`)
        }

        for (const prod of productosSeed) {
            const [producto, created] = await Product.findOrCreate({
                where: { name: prod.name },
                defaults: prod
            });
            console.log(created ? `Producto creado: ${prod.name}` : `Producto ya existe: ${prod.name}`);
        }
    } catch (error) {
        console.error('error al ejecutar el seed', error);
    } finally {
        await sequelize.close();
    }
}

runseed();