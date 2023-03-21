const {DataTypes, Sequelize} = require('sequelize');

module.exports = sequelize => {
    sequelize.define('Instructor',
    {
      id: {
        type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
      },
      instructorName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      instructorScore:{
        type: DataTypes.STRING,
        allowNull: true
      },
      instructorReview: {
        type: DataTypes.STRING,
        allowNull: false
      },
      instructorDescription:{
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { timestamps: false }
    )
}