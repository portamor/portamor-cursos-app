const {DataTypes, Sequelize} = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "Instructor",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      score: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {timestamps: false,
      paranoid: true,}
  );
};
