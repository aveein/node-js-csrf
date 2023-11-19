const {Sequilize,DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Order = sequelize.define('order',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity:DataTypes.INTEGER

    
})

module.exports = Order;