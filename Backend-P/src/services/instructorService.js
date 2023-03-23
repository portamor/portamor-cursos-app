const { Instructor } = require("../database")

const createIntructorInDB = async ({ courseId, data }) => {
  const createdInstructor = await Instructor.create({
    description: data.description,
    name: data.name,
    profile_picture: data.profile_picture,
    score: data.score,
    review: data.review,
    CourseId: courseId
  });

  return createdInstructor;
}

const getAllIntructorFromDB = async () => {
  return Instructor.findAll();
}

module.exports = {
  createIntructorInDB,
  getAllIntructorFromDB
}