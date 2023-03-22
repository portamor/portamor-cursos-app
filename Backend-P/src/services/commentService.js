const { Comments, Courses }= require('../database.js')

const createCommentInDatabase = async ({courseId, content, satisfaction}) => {
  const createdComment = await Comments.create({
    content,
    satisfaction,
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
  createCommentInDatabase,
  getCommentById,
  getCommentsByCourseId,
  updateComment,
  deleteCommentFromDB,
  restoreCommentFromDB
}