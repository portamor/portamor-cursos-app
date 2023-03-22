const { Comments, Courses }= require('../database.js')

const createCommentInDatabase = async ({id, content, satisfaction}) => {
  const createdComment = await Comments.create({
    content,
    satisfaction,
    CourseId: id
  })

  return createdComment;
}

const getCommentById = async (id) => {
  const foundComment = await Comments.findByPk(id);
  return foundComment;
}

const getCommentsByCourseId = async (id) => {
  const foundCoursefromDB = Courses.findByPk(id, {
    include: { model: Comments}
  })
  
  return foundCoursefromDB;
}

const updateComment = async ({id, data}) => {
  const commentToUpdate = await getCommentById(id);
  
  commentToUpdate.set(data);
  await commentToUpdate.save()

  return commentToUpdate;
}

module.exports = {
  createCommentInDatabase,
  getCommentById,
  getCommentsByCourseId,
  updateComment
}