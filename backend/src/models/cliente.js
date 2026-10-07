import { DataTypes } from 'sequelize'
import sequelize from '../../config/database.js'

const Cliente = sequelize.define('clientes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }

},{
    tableName: 'clientes',
    timestamps: false
});

export default Cliente;
