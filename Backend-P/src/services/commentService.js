const { Comments, Courses }= require('../database.js')

const createCommentInDatabase = async ({id, content, satisfaction}) => {
  const createdComment = await Comments.create({
    content,
    satisfaction,
    CourseId: id
  })

  return createdComment;
}

const getCommentsByCourse = async (id) => {
  const foundCoursefromDB = Courses.findByPk(id, {
    include: { model: Comments}
  })
  
  return foundCoursefromDB;
}

module.exports = {
  createCommentInDatabase,
  getCommentsByCourse
}