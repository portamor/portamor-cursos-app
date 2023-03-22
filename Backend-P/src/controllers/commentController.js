const { Comments, Courses } = require('../database.js')
const commentService        = require('../services/commentService')
const courseService         = require('../services/courseService')

const postComment = async (req, res) => {
  try {
    const { content, satisfaction } = req.body;
    const id = req.params.id;
    const courseFound = await courseService.getCourseById(id)

    if(!courseFound) {
      throw new Error(`No se ha encontrado ningun curso con este ID: ${id}`)
    }

    if(!content || !satisfaction) {
      throw new Error("Estan faltando valores para crear un comentario")
    }

    const createdComment = await commentService.createCommentInDatabase({
      content,
      satisfaction,
      CourseId: courseFound.id
    })

    if(!createdComment) {
      throw new Error("No ha sido posible crear un comentario")
    }

    res.status(200).json({msg: "Comentario creado exitosamente", data: createdComment})
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

const getAllComments = async (req, res) => {
    try {
      res.status(200).json({msg: "holas"})
    } catch (error) {
        res.status(400).send('error al obtener commentarios')
    }
}

module.exports = {
  getAllComments,
  postComment
}