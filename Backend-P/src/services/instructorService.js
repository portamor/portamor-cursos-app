const { Instructor, Courses } = require("../database")
const courseService = require("./courseService")

const createIntructorInDB = async ({ courseId, data }) => {
  const foundCourse = await courseService.getCourseById(courseId);

  const createdInstructor = await Instructor.create({
    description: data.description,
    name: data.name,
    profile_picture: data.profile_picture,
    score: data.score,
    reviews: data.reviews,
  });

  await createdInstructor.addCourse(foundCourse);

  return createdInstructor;
}

const getAllIntructorFromDB = async () => {
  return Instructor.findAll({
    include: Courses
  });
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

const addCourseToInstructor = async ({ instructorId, courseId }) => {
  const instructorToUpdate = await Instructor.findByPk(instructorId);
  const foundCourse = await courseService.getCourseById(courseId);

  await instructorToUpdate.addCourses(foundCourse)

  return instructorToUpdate;
}

module.exports = {
  createIntructorInDB,
  getInstructorById,
  getAllIntructorFromDB,
  updateInstructor,
  addCourseToInstructor
}