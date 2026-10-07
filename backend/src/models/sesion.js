import sequelize from "../../config/database.js";
import { DataTypes } from "sequelize";

const Sesion = sequelize.define("sesiones",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userType:{
        type: DataTypes.ENUM('client', 'admin'),
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    expiresAt:{
        type: DataTypes.DATE,
        allowNull: false,
    }
},{
    tableName: "sesiones",
    timestamps: true,
});

export default Sesion;