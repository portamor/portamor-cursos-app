const { Router }        = require('express');
const commentController = require('../controllers/commentController')
const commentRouter     = Router()

// ---- POST
commentRouter.post('/:courseId', commentController.postComment);
//----- GET
commentRouter.get('/:courseId',  commentController.getAllCommentsByCourseId)
//----- PUT
commentRouter.put('/:commentId', commentController.putComment)
commentRouter.put('/restore/:commentId', commentController.restoreComment)
//----- DELETE
commentRouter.delete('/:commentId', commentController.deleteComment)

module.exports = commentRouter;