const { Router }       = require('express');
const reviewController = require('../controllers/reviewController')
const reviewRouter     = Router()

// ---- POST
reviewRouter.post('/:courseId', reviewController.postComment);
//----- GET
reviewRouter.get('/:courseId',  reviewController.getAllCommentsByCourseId)
//----- PUT
reviewRouter.put('/:commentId', reviewController.putComment)
reviewRouter.put('/restore/:commentId', reviewController.restoreComment)
//----- DELETE
reviewRouter.delete('/:commentId', reviewController.deleteComment)

module.exports = reviewRouter;