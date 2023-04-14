const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define(
        'VideoState', 
{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  videoId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  watched: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})
};

