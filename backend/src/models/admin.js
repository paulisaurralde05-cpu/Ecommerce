import { DataTypes } from 'sequelize'
import sequelize from '../../config/database.js'

const Admin = sequelize.define('admins', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
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
    },
    role: {
        type: DataTypes.ENUM('superadmin', 'gestor_productos', 'auditor'),
        allowNull: false,
    }


},{
    timestamps: true,

})

export default Admin;