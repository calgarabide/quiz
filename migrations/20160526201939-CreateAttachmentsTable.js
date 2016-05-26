'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Attachments',
  { id:         { type: Sequelize.INTEGER, 
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true, 
      unique: true 
     },
     QuizId:  { type: Sequelize.INTEGER, 
      allowNull: false 
     },
     public_id: { type: Sequelize.INTEGER, 
      allowNull: false 
     },
     url:  { type: Sequelize.INTEGER, 
       allowNull: false 
     },
     filename:  { type: Sequelize.INTEGER, 
      allowNull: false 
     },
     mime:  { type: Sequelize.INTEGER, 
        allowNull: false 
     },
     createdAt: { type: Sequelize.DATE, 
      allowNull: false 
     },
           updatedAt: { type: Sequelize.DATE, 
      allowNull: false 
     }
  },
  { sync: {force: true}
  } 
    );
  },
    
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Attachments');
  }
};