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

const getAllCourses = async () => {
  const allCoursesFound = await Courses.findAll({
    include: [
      { 
        model: Sections, 
        include: [ Videos ] 
      },
    ]
  });

  return allCoursesFound;
};

const getCourseById = async (id) => {
  const courseFound = await Courses.findOne({
    where: {id: id},
    include: [
      { 
        model: Sections, 
        include: [ Videos ] 
      },
    ]
  })
  return courseFound;
};

const getCourseByTitle = async (title) => {
  const titleCourse = await Courses.findAll({
    where: { title: { [Op.iLike]: `%${title}%` } },
    order: [["title", "ASC"]],
    include: [
      { 
        model: Sections, 
        include: [ Videos ] 
      },
    ]
  });
  return titleCourse;
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
  createCourse,
  updateCourse,
  deleteACourse,
  restoreACourse,
};
