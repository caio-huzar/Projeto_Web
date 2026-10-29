const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'seu_databsae',
    'postgres',
    'sua_senha',
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    }
);

module.exports = sequelize;
