require('dotenv').config();
const {Sequelize} = require('sequelize');
const fs = require('fs');
const path = require('path');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } =
  process.env;


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
    Inscription,
    Videos
} = sequelize.models;

Users.hasMany(Comments);
Comments.belongsTo(Users);

Users.hasMany(Inscription);
Inscription.belongsTo(Users);

Inscription.hasMany(Courses)
Courses.belongsTo(Inscription)

Courses.hasMany(Instructor);
Instructor.belongsTo(Courses);

Courses.hasMany(Videos);
Videos.belongsTo(Courses)

Instructor.hasMany(Videos);
Videos.belongsTo(Instructor)


Videos.hasMany(Comments);
Comments.belongsTo(Videos);


module.exports = {
    ...sequelize.models,
    conn: sequelize, 
}
