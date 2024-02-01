const fs   = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env; 

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
  logging: false,
  native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

  modelDefiners.forEach((model) => model(sequelize));

  let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

const {
    Users,
    Instructor,
    Courses,
    Review,
    Videos,
    Sections,
    VideoState,
    CourseInscription,
    PaymentDevice
} = sequelize.models;

// ---- Users - Review
Users.hasMany(Review);
Review.belongsTo(Users);

// ---- Inscriptions Relations
Users.belongsToMany(Courses, {
  through: 'CourseInscription',
})

Courses.belongsToMany(Users, {
  through: 'CourseInscription',
})

// ---- Courses Relations
Courses.hasMany(Sections);
Sections.belongsTo(Courses)

Courses.hasMany(Review);
Review.belongsTo(Courses);


// ---Sections Relation
Sections.hasMany(Videos);
Videos.belongsTo(Sections)

// ---- Instructor Relations
Instructor.hasMany(Courses);
Courses.belongsTo(Instructor)

module.exports = {
  ...sequelize.models,
  conn: sequelize, 
}
