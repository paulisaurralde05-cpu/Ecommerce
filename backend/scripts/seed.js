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
        name: 'Guitarra Acústica Yamaha F310',
        price: 285000.00,
        stock: 10,
        category: 'Guitarras',
    },
    {
        name: 'Guitarra Eléctrica Fender Squier Stratocaster',
        price: 650000.00,
        stock: 5,
        category: 'Guitarras',
    },
    {
        name: 'Teclado Musical Casio CT-S300',
        price: 420000.00,
        stock: 8,
        category: 'Teclados',
    },
    {
        name: 'Piano Digital Yamaha P-45',
        price: 1250000.00,
        stock: 3,
        category: 'Teclados',
    },
    {
        name: 'Batería Acústica Mapex Tornado',
        price: 890000.00,
        stock: 4,
        category: 'Baterías',
    },
    {
        name: 'Batería Electrónica Yamaha DTX402K',
        price: 1100000.00,
        stock: 3,
        category: 'Baterías',
    },
    {
        name: 'Micrófono Dinámico Shure SM58',
        price: 195000.00,
        stock: 12,
        category: 'Accesorios',
    },
    {
        name: 'Auriculares de Estudio Audio-Technica ATH-M20x',
        price: 145000.00,
        stock: 15,
        category: 'Accesorios',
    },
    {
        name: 'Soporte para Guitarra Hercules',
        price: 48000.00,
        stock: 20,
        category: 'Accesorios',
    },
    {
        name: 'Afinador Cromático Korg CA-2',
        price: 35000.00,
        stock: 25,
        category: 'Accesorios',
    },
    {
        name: 'Ukelele Soprano Kala',
        price: 135000.00,
        stock: 7,
        category: 'Guitarras',
    },
    {
        name: 'Pedal de Efectos Boss DS-1',
        price: 165000.00,
        stock: 9,
        category: 'Accesorios',
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