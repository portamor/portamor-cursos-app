const { Courses, Videos, Sections }= require('../database.js')
const {Op} = require('sequelize')

const createCourse = async (data) => {
  const createdCourse = await Courses.create({
    title:       data.title,
    description: data.description,
    image:       data.image,
    genre:       data.genre,
    type:        data.type,
    rating:      data.rating,
    materials:   data.materials,
  });

  return createdCourse;
};

const getAllCourses = async (page, size) => {
  const allCoursesFound = await Courses.findAll({
    limit: size,
    offset: (page - 1) * size
  });

  return allCoursesFound;
};

const getCourseById = async (id) => {
  const courseFound = await Courses.findOne({
    where: {id: id},
    paranoid: false,
  })
  return courseFound;
};

const getCourseByTitle = async (title) => {
  const foundCourse = await Courses.findAll({
    where: { title: { [Op.iLike]: `%${title}%` } },
    order: [["title", "ASC"]],
  });
  return foundCourse;
};

const getCourseByTitleExactly = async (title) => {
  const foundCourse = await Courses.findAll({
    where: { title: title },
    order: [["title", "ASC"]],
  });
  return foundCourse;
};

const getCourseByType = async (type) => {
  const courseType = await Courses.findAll({
    where: {
      type: {
        [Op.iLike]: `%${type}%`,
      },
    },
    order: [["title", "ASC"]],
  });
  return courseType;
};

const getCourseBygenre = async (genre) => {
  const foundCourse = await Courses.findAll({
    where: { genre: genre },
    order: [["title", "ASC"]],
  });

  return foundCourse;
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
    where: { id: id },
  });

  const restoredCourse = await getCourseById(id);

  return restoredCourse;
};

module.exports = {
  getCourseById,
  getAllCourses,
  getCourseByTitle,
  getCourseByType,
  getCourseBygenre,
  createCourse,
  updateCourse,
  deleteACourse,
  restoreACourse,
  getCourseByTitleExactly
};
