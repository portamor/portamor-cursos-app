const {DataTypes, Sequelize} = require('sequelize');

module.exports = sequelize => {
    sequelize.define( 'Videos', 
    {
      id: {
        type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
      },
      videoTitle: {
        type: DataTypes.STRING,
        allowNull: false
      },
      videoLink:{
        type: DataTypes.STRING, 
        allowNull: false,
      },
      videoDescription: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { timestamps: false,
      paranoid: true }
    )
  };