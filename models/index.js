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

// Importar la definición de la tabla Attachments de attachment.js
var Attachment = sequelize.import(path.join(__dirname,'attachment'));



// Relaciones 1 a N entre Comment y Quiz
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// Relacion 1 a N entre User y Quiz:
User.hasMany(Quiz, {foreignKey: 'AuthorId'});
Quiz.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});

// Relaciones 1 a 1 entre Quiz y Attachment
Attachment.belongsTo(Quiz);
Quiz.hasOne(Attachment);

// Relacion 1 a N entre User y Comments:
User.hasMany(Comment, {foreignKey: 'AuthorId'});
Comment.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});

exports.Quiz = Quiz; 	   	// exportar definición de la tabla Quiz
exports.Comment = Comment; 	// exportar definición de la tabla Comments
exports.User = User; 	   	// exportar definición de la tabla Users
exports.Attachment = Attachment;// exportar definición de la tabla Attachments