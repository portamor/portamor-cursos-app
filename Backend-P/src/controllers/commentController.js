const { Comments, Courses } = require('../database.js')
const commentService        = require('../services/commentService')
const courseService         = require('../services/courseService')

const postComment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { content, satisfaction } = req.body;

    if(!content || !satisfaction) {
      throw new Error("Estan faltando valores para crear un comentario")
    }

    const courseFound = await courseService.getCourseById(courseId)

    if(!courseFound) {
      throw new Error(`No se ha encontrado ningun curso con este ID: ${courseId}`)
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

const getAllCommentsByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    if(!courseId) throw new Error("No se ha enviado un id de un curso para buscar comentarios")

    const courseFound = await courseService.getCourseById(courseId)

    if(!courseFound) {
      throw new Error(`No se ha encontrado ningun curso con este ID: ${courseId}`)
    }

    const { Comments } = await commentService.getCommentsByCourseId(courseFound.id)

    res.status(200).json({msg: "Comentarios encontrados con exito", data: Comments})
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

const putComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    
    if(!commentId) throw new Error("No se ha enviado un id para actualizar un comentario")

    const foundComment = await commentService.getCommentById(commentId)

    if(!foundComment) {
      throw new Error(`No se ha encontrado ningun comentario con el ID: ${commentId}`)
    }

    const updatedComment = await commentService.updateComment({
      id: commentId,
      data: req.body
    })
    
    res.status(200).json({msg: "Comentario actualizado con exito", data: updatedComment})
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

module.exports = {
  postComment,
  getAllCommentsByCourseId,
  putComment
}