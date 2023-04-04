const {DataTypes, Sequelize} = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Review',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.ENUM("Excelente", "Recomendado", "Bueno", "No me gusto", "Malo"),
        allowNull: false
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      },
      stars_value: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    },
    { 
      timestamps: true,
      paranoid: true,
    }
  )
}