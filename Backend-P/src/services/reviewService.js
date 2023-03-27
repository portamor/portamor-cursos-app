const { Review, Courses }= require('../database.js')

const createReviewInDatabase = async ({courseId, comment, title, stars_value}) => {
  const createdReview = await Review.create({
    comment,
    title,
    stars_value,
    CourseId: courseId
  })
  return createdReview;
};

const getReviewById = async (id) => {
  const foundReview = await Review.findByPk(id);
  return foundReview;
};

const getReviewsByCourseId = async (id) => {
  const foundCoursefromDB = await Courses.findByPk(id, {
    include: { model: Review}
  })
  return foundCoursefromDB;
};

const updateReview = async ({ id, data }) => {
  const commentToUpdate = await getReviewById(id);

  commentToUpdate.set(data);
  await commentToUpdate.save()
  
  return commentToUpdate;
};

const deleteCommentFromDB = async(id) => {
  const comment = await getReviewById(id);
  await comment.destroy()
};

const restoreCommentFromDB = async(id) => {
  await Comments.restore({ 
    where: { id: id } 
  })
};

module.exports = {
  createReviewInDatabase,
  getReviewById,
  getReviewsByCourseId,
  updateReview,
  deleteCommentFromDB,
  restoreCommentFromDB
}