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

const getInstructorById = async (id) => {
  const foundInstructor = await Instructor.findByPk(id)
  return foundInstructor;
}

const updateInstructor = async ({ id, data }) => {
  const instructorToUpdate = await Instructor.findByPk(id)

  instructorToUpdate.set(data);
  await instructorToUpdate.save()

  return instructorToUpdate;
}

module.exports = {
  createIntructorInDB,
  getInstructorById,
  getAllIntructorFromDB,
  updateInstructor
}