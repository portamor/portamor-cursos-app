const { Comments, Courses }= require('../database.js')

const createCommentInDatabase = async ({id, content, satisfaction}) => {
  const createdComment = await Comments.create({
    content,
    satisfaction,
    CourseId: id
  })

  return createdComment;
}

// const getAllCommentsFromDatabase = async (req, res) => {
//     try {
//       res.status(200).json({msg: "holas"})
//     } catch (error) {
//         res.status(400).send('error al obtener commentarios')
//     }
// }

module.exports = {
  createCommentInDatabase,
  // postComment
}