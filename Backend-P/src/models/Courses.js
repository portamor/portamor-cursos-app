const {DataTypes, Sequelize} = require('sequelize');

module.exports = sequelize => {
    sequelize.define( 'Courses',
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
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        typeCourse: {
            type: DataTypes.STRING,
            allowNull: false
        },
        goals: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: true
        },
        materials: {
            type: DataTypes.STRING,
            allowNull: true
        },
        testimony: {
            type: DataTypes.STRING,
            allowNull: true
        },
        methodology: {
            type: DataTypes.STRING,
            allowNull: true
        },
        genreCourse:{
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    { timestamps: false,
        paranoid: true}
    )
}