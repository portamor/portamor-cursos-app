require('dotenv').config();
const fs   = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

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
    Comments,
    Videos
} = sequelize.models;

// ---- Users Relations
Users.hasMany(Comments);
Comments.belongsTo(Users);

// ---- Inscriptions Relations
Users.belongsToMany(Courses, {
  through: 'course_Inscription',
})

Courses.belongsToMany(Users, {
  through: 'course_Inscription',
})

// ---- Courses Relations
Courses.hasMany(Videos);
Videos.belongsTo(Courses)

Courses.hasMany(Comments);
Comments.belongsTo(Courses);


// ---- Instructor Relations
Instructor.hasMany(Courses, { as: "courses"});
Courses.belongsTo(Instructor)

module.exports = {
    ...sequelize.models,
    conn: sequelize, 
}
