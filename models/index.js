var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
//   DATABASE_URL = sqlite:///
//   DATABASE_STORAGE = quiz.sqlite
// Usar BBDD Postgres:
//   DATABASE_URL = postgres://user:passwd@host:port/database

var url, storage;

if (!process.env.DATABASE_URL) { // entorno de desarrollo local con la BBDD sqlite
	url = "sqlite:///";
	storage = "quiz.sqlite";
} else { // entorno de producción en Heroku con la BBDD Postgres
	url = process.env.DATABASE_URL;
	storage = process.env.DATABASE_STORAGE || "";
}

var sequelize = new Sequelize(url,
		 	      { storage: storage, 
				omitNull:true 
			      });

// Importar la definición de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Importar la definición de la tabla Comment de comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

// Importar la definición de la tabla Users de user.js
var User = sequelize.import(path.join(__dirname,'user'));


// Relaciones entre modelos
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // exportar definición de la tabla Quiz
exports.Comment = Comment; // exportar definición de la tabla Comment
exports.User = User; 	   // exportar definición de la tabla Users