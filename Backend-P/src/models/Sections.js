const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Sections",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      nameSection: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false, paranoid: true }
  );
};
