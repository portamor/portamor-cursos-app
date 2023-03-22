const { Courses }= require('../database.js')

const getCourseById = async (id) => {
  const courseFound = await Courses.findByPk(id)
  return courseFound;
}


module.exports = {
  getCourseById,
}