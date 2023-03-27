const { Review, Courses }= require('../database.js')

const createReviewInDatabase = async ({courseId, comment, title, stars_value}) => {
  const createdComment = await Review.create({
    comment,
    title,
    stars_value,
    CourseId: courseId
  })
  return createdComment;
};

const getCommentById = async (id) => {
  const foundComment = await Comments.findByPk(id);
  return foundComment;
};

const getCommentsByCourseId = async (id) => {
  const foundCoursefromDB = await Courses.findByPk(id, {
    include: { model: Comments}
  })
  return foundCoursefromDB;
};

const updateComment = async ({id, data}) => {
  const commentToUpdate = await getCommentById(id);
  commentToUpdate.set(data);
  await commentToUpdate.save()
  return commentToUpdate;
};

const deleteCommentFromDB = async(id) => {
  const comment = await getCommentById(id);
  await comment.destroy()
};

const restoreCommentFromDB = async(id) => {
  await Comments.restore({ 
    where: { id: id } 
  })
};

module.exports = {
  createReviewInDatabase,
  getCommentById,
  getCommentsByCourseId,
  updateComment,
  deleteCommentFromDB,
  restoreCommentFromDB
}