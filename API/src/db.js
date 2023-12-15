/* eslint-disable no-undef */
require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { //agregar al ?ssl=true necesitas iniciar el server de forma local
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

const { Users,
  Products,
  Orders,
  Productreview ,
  ISBN,
  Cart,
  OrderDetail
} = sequelize.models;

//ManyToMany ==> Orders - "Productreview" - Products
Orders.belongsToMany(Products,{through:Productreview});
Products.belongsToMany(Orders,{through:Productreview});
//redundancia
// Productreview.belongsTo(Orders);
// Productreview.belongsTo(Products);

// One To One ==> pruducts - ISBN 

Products.hasOne(ISBN);
ISBN.belongsTo(Products);
//Existe una redundancia.
// ISBN.hasOne(Products);
//  Products.belongsTo(ISBN);

//Relacion entre Users y Products de muchos a muchos.

Users.belongsToMany(Products,{through:Cart});
Products.belongsToMany(Users,{through:Cart});

// One To Many ==> ISBN - OrderDetail --> One to One ==> OrderDetail - ISBN
ISBN.hasMany(OrderDetail, { foreignKey: "ISBNid",as:"ISBN"});
OrderDetail.belongsTo(ISBN);

//Relacion entre Cart y Orders de uno a muchos.

Cart.hasMany(Orders);
Orders.belongsTo(Cart);

//Relacion entre Orders y OrderDetail de uno a uno.

Orders.hasOne(OrderDetail);
OrderDetail.belongsTo(Orders);

module.exports = {
    Users,
    Products,
    Orders,
    Productreview,
    conn:sequelize,
}
