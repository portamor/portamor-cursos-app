const { Router }       = require('express');
const reviewController = require('../controllers/reviewController')
const reviewRouter     = Router()

// ---- POST
reviewRouter.post('/', reviewController.postReview);
//----- GET
reviewRouter.get('/:courseId', reviewController.getAllReviewsByCourseId)
//----- PUT
reviewRouter.put('/:reviewId',         reviewController.putReview)
reviewRouter.put('/restore/:reviewId', reviewController.restoreReview)
//----- DELETE
reviewRouter.delete('/:reviewId', reviewController.deleteReview)

module.exports = reviewRouter;