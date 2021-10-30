const {Sequelize} = require('sequelize');

const db = new Sequelize("postgres://postgres:bc464deb64c94c749bb485515af91f4d@localhost:5432/animal-server");

module.exports = db;