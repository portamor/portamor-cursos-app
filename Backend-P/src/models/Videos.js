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
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      likes: {
        type: DataTypes.STRING,
        allowNull: true
      },
      dislikes: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }
    )
}