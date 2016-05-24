var path = require('path');

//Cargar Modelo ORM
var Sequelize = require('sequelize');

   // DATABASE_URL = "sqlite:///"
//DATABASE_STORAGE = "quiz.sqlite"
 // Usar BBDD Postgres:
//DATABASE_URL = "postgres://xrpqjupolbysop:owiXEDLT72YgAuMoGnl-uDD_fA@ec2-50-19-242-27.compute-1.amazonaws.com:5432/dbm92297nqfv7q";

var url = DATABASE_URL;
var storage = DATABASE_STORAGE || "";
var url, storage;

if(!process.env.DATABASE_URL) {
 url = "sqlite:///";
 storage = "quiz.sqlite";
} else{
 url = process.env.DATABASE_URL;
 storage = process.env.DATABASE_STORAGE || "";
}

//Usar BBDD SQLite:
var sequelize = new Sequelize(url, { storage: storage, omitNull: true });
                      

// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; //exportar definición de tabla Quiz    
