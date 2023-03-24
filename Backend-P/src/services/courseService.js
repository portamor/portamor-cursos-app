const { Courses }= require('../database.js')
const {Op} = require('sequelize')

const getCourseById = async (id) => {
  const courseFound = await Courses.findByPk(id)
  return courseFound;
};

const getAllCourses = async () => {
  const allCoursesFound = await Courses.findAll()
  return allCoursesFound
};

const getCourseByTitle = async (title) => {
  
  const titleCourse = await Courses.findAll({
    where: { title: { [Op.iLike]: `%${title}%` } },
    order: [["title", "ASC"]],
  });
  return titleCourse;
};

const getCourseByType = async (typeCourse) => {
  const courseType = await Courses.findAll({
    where: {
      typeCourse: {
        [Op.iLike]: `%${typeCourse}%`,
      },
    },
    order: [["title", "ASC"]],
  });
  return courseType;
};

const getCourseBygenre = async (genreCourse) => {
  const coursesGenre = await Courses.findAll({
    where: {
      genreCourse: {
        [Op.iLike]: `%${genreCourse}%`,
      },
    },
    order: [["title", "ASC"]],
  });
  return coursesGenre;
};

const createACourse = async (arg) => {
  const postCourse = await Courses.create(arg);
  return postCourse;
};

const updateCourse = async ({ id, data }) => {
  const upCourse = await getCourseById(id);
  upCourse.set(data);
  await upCourse.save();
  return upCourse;
};

const deleteACourse = async (id) => {
  const deleteCourse = await getCourseById(id);
  await deleteCourse.destroy();
};

const restoreACourse = async (id) => {
  await Courses.restore({
    where: {
      id: id,
    },
  });
};


module.exports = {
  getCourseById,
  getAllCourses,
  getCourseByTitle,
  getCourseByType,
  getCourseBygenre,
  createACourse,
  updateCourse,
  deleteACourse,
  restoreACourse
}