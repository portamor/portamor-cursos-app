const {DataTypes, Sequelize} = require('sequelize');

module.exports = sequelize => {
    sequelize.define( 'PaymentDevice',
    {
        id:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deviceNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deviceToken: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        },
        { timestamps: false,
            paranoid: true, }
    )
}