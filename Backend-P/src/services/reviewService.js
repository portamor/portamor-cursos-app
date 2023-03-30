const courseService       = require("./courseService");
const userService         = require("./userService");
const { Review, Courses } = require('../database.js')

const createReviewInDatabase = async ({courseId, comment, title, userId, stars_value}) => {
  const foundCourse = await courseService.getCourseById(courseId);
  const foundUser   = await userService.userById(userId);

  const createdReview = await Review.create({
    comment,
    title,
    stars_value,
  });

  await createdReview.setCourse(foundCourse);
  await createdReview.setUser(foundUser);

  return createdReview;
};

const getReviewById = async (id) => {
  const foundReview = await Review.findOne({ 
    where: { id: id }, paranoid: false 
  });
  return foundReview;
};

const getReviewsByCourseId = async (id) => {
  const foundCoursefromDB = await Courses.findByPk(id, {
    include: { model: Review}
  })
  return foundCoursefromDB;
};

const updateReview = async ({ id, data }) => {
  const reviewToUpdate = await getReviewById(id);

  reviewToUpdate.set(data);
  await reviewToUpdate.save()
  
  return reviewToUpdate;
};

const deleteReviewFromDB = async(id) => {
  const foundReview = await getReviewById(id);
  await foundReview.destroy()
};

const restoreReviewFromDB = async(id) => {
  await Review.restore({ 
    where: { id: id } 
  });
  
  const restoredReview = await getReviewById(id);

  return restoredReview;
};

module.exports = {
  createReviewInDatabase,
  getReviewById,
  getReviewsByCourseId,
  updateReview,
  deleteReviewFromDB,
  restoreReviewFromDB
}