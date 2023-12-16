const {DataTypes, Sequelize} = require('sequelize');

module.exports = sequelize => {
    sequelize.define( 'CourseInscription',
      {
        enrolmentStatus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        holderPaymentMethod: {
            type: DataTypes.STRING,
            allowNull: true,
        },
      },
      { timestamps: true }
    )
}