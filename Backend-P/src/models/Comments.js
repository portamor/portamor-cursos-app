const {DataTypes, Sequelize} = require('sequelize');

module.exports = sequelize => {
    sequelize.define( 'Comments',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        content: {
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