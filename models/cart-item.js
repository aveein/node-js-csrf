const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');


const CartItem = sequelize.define('cartItems',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: Sequelize.INTEGER
});

module.exports = CartItem;