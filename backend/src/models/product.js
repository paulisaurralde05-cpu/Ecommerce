import sequelize from "../../config/database.js";
import { DataTypes } from "sequelize";

const Product = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    category: {
        type: DataTypes.STRING
    }

}, {
    timestamps: true,
    tableName: 'products'
});

export default Product;