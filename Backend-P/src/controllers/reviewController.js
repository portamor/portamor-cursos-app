const courseService = require('../services/courseService');
const reviewService = require('../services/reviewService');
const userService   = require("../services/userService");

const postReview = async (req, res) => {
  try {
    const { comment, title, stars_value, courseId, userId } = req.body;

    if(!comment || !title || !stars_value || !userId || !courseId) {
      throw new Error("Estan faltando valores para crear una opinion")
    }

    const foundCourse = await courseService.getCourseById(courseId)
    const foundUser = await userService.userById(userId)
    
    if(!foundCourse) {
      throw new Error(`No se ha encontrado ningun curso con este ID: ${courseId}`)
    }
    if(!foundUser) {
      throw new Error(`No se ha encontrado ningun usuario con este ID: ${userId}`)
    }

    const createdComment = await reviewService.createReviewInDatabase({
      comment,
      title,
      stars_value,
      userId: foundUser.id,
      courseId: foundCourse.id
    })

    if(!createdComment) throw new Error("No ha sido posible crear una opinion")

    res.status(201).json({message: "Opinion creada exitosamente", data: createdComment})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

const getAllReviewsByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    if(!courseId) throw new Error("No se ha recibido un id de un curso")

    const foundCourse = await courseService.getCourseById(courseId)

    if(!foundCourse) {
      throw new Error(`No se ha encontrado ningun curso con este ID: ${courseId}`)
    }

    const { Reviews } = await reviewService.getReviewsByCourseId(foundCourse.id)

    if(!Reviews.length) throw new Error("No se han encontrado opiniones de este curso");

    res.status(200).json({message: "Opiniones encontradas con exito", data: Reviews})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

const putReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    const foundReview = await reviewService.getReviewById(reviewId)

    if(!foundReview) {
      throw new Error(`No se ha encontrado ninguna opinion con el ID: ${reviewId}`)
    }

    const updatedReview = await reviewService.updateReview({
      id: reviewId,
      data: req.body
    })
    
    res.status(200).json({message: "Opinion actualizada con exito", data: updatedReview})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    const foundReview = await reviewService.getReviewById(reviewId)

    if(!foundReview) {
      throw new Error(`No se ha encontrado ningun comentario con el ID: ${reviewId}`)
    }

    await reviewService.deleteReviewFromDB(reviewId)
    
    res.status(200).json({message: "Opinion eliminada con exito"})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

const restoreReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    const foundReview = await reviewService.getReviewById(reviewId);

    if(!foundReview) {
      throw new Error(`No se ha encontrado ninguna opinion con el ID: ${reviewId}`);
    }
    if(foundReview.deletedAt === null) {
      throw new Error("La opinion no habia sido eliminada anteriormente");
    } 

    const restoredReview = await reviewService.restoreReviewFromDB(reviewId);
    
    res.status(200).json({ message: "Opinion restaurada con exito", data: restoredReview });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  postReview,
  getAllReviewsByCourseId,
  putReview,
  deleteReview,
  restoreReview
}