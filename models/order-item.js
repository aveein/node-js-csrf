const {Sequilize,DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const OrderItem = sequelize.define('orderItems',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity:DataTypes.INTEGER

    
})

module.exports = OrderItem;