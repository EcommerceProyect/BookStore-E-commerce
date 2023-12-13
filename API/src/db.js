require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?ssl=true`, { //agregar al ?ssl=true necesitas iniciar el server de forma local
    logging: false,
    native: false,
}); // ssl= true soluciona los conflictos con los ssl de autenticacion de Render

const basename = path.basename(__dirname);
const modelDefiners= [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (!file.startsWith('.')) && (file !== basename) && (file.endsWith('.js')))
  .forEach((file) => {
    const modelDefinition= require(path.join(__dirname, '/models', file));
    modelDefiners.push(modelDefinition);
  });
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
Object.assign(sequelize.models, ...capsEntries);

const { Users,Products } = sequelize.models;

module.exports = {
    Users,
    Products,
    conn:sequelize,
}