const {DataTypes, Sequelize} = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "Courses",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      materials: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      isPaymentCourse: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: true, paranoid: true }
  );
};

//Se limita genre, si en un futuro se quieren adherir mas generos, se tendria que modificar todo el modelo.