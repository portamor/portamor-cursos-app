const {DataTypes, Sequelize} = require('sequelize');

module.exports = sequelize => {
    sequelize.define( 'Users',
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
        },
        { timestamps: false,
            paranoid: true, }
    )
}