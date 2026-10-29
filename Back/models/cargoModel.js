const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cargo = sequelize.define('Cargo', {

    car_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    car_nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }

},
{
    tableName: 'cargo',
    timestamps: false
});

module.exports = Cargo;