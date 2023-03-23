const { Instructor } = require("../database")

const createIntructorInDB = async ({ courseId, data }) => {
  const createdInstructor = await Instructor.create({
    instructorName: data.instructorName,
    instructorScore: data.instructorScore,
    instructorReview: data.instructorReview,
    instructorDescription: data.instructorDescription,
    CourseId: courseId
  });

  return createdInstructor;
}

module.exports = {
  createIntructorInDB,
}