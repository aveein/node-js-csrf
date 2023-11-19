const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Product = sequelize.define('product',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: DataTypes.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },  
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


module.exports = Product;       
