/* eslint-disable no-undef */
require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
<<<<<<< HEAD
const sequelize = new Sequelize(`postgres:${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?ssl=true`, { //agregar al ?ssl=true necesitas iniciar el server de forma local
    logging: false,
=======
const sequelize = new Sequelize(`postgres:${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { //agregar al ?ssl=true necesitas iniciar el server de forma local
 
  logging: false,
>>>>>>> 9917ca5bbd0fb126e1201fb8a9f124c00678cc36
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
  OrderDetail,
  ReleasedDate,
  Author,
  Genre,
  Editorial,
} = sequelize.models;

//ManyToMany ==> Orders - "Productreview" - Products
Orders.belongsToMany(Products,{through:Productreview});
Products.belongsToMany(Orders,{through:Productreview});

// One To One Products - ISBN

Products.hasOne(ISBN, { foreignKey: 'ISBNId' });
ISBN.belongsTo(Products, { foreignKey: 'ISBNId' });

//Relacion entre Users y Products de muchos a muchos.

Users.belongsToMany(Products,{through:Cart});
Products.belongsToMany(Users,{through:Cart});

// One To Many ==> ISBN - OrderDetail --> One to One ==> OrderDetail - ISBN

ISBN.hasMany(OrderDetail, { foreignKey: "ISBNid",as:"ISBNs"});
OrderDetail.belongsTo(ISBN);

// Order - OderDetail ==> One To Many

// n:n -- Author - Products 
const AuthorProducts = sequelize.define("AuthorProducts", {},{timestamps:true});
Products.belongsToMany(Author, { through: AuthorProducts, timestamps:true });
Author.belongsToMany(Products, { through: AuthorProducts, timestamps:true });

// n:n -- Genre - Products
const GenreProducts = sequelize.define("GenreProducts", {},{timestamps:true});
Products.belongsToMany(Genre,{through: GenreProducts, timestamps:true });
Genre.belongsToMany(Products,{through: GenreProducts, timestamps:true });

// 1:1 --- Editorial - Products 
Products.belongsTo(Editorial);
Editorial.hasOne(Products);



Cart.hasMany(Orders);
Orders.belongsTo(Cart);

//Relacion entre Orders y OrderDetail de uno a uno.

Orders.hasOne(OrderDetail);
OrderDetail.belongsTo(Orders);


// releaseDate - Products

Products.hasOne(ReleasedDate)
ReleasedDate.belongsTo(Products);


module.exports = {
    Users,
    Products,
    Orders,
    Productreview,
    ISBN,
    ReleasedDate,
    OrderDetail,
    Genre,
    Author,
    Editorial,
    //     //exporto Cart y GenreProducts para futuros usos
    Cart,
    GenreProducts,
    AuthorProducts,
    conn:sequelize,
}




