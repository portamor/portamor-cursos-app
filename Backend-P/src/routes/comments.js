const { Router }        = require('express');
const commentController = require('../controllers/commentController')
const commentRouter     = Router()

// ---- POST
commentRouter.post('/:courseId', commentController.postComment);

//----- GET
commentRouter.get('/:courseId',  commentController.getAllCommentsByCourseId)

//----- PUT
commentRouter.put('/:courseId',  commentController.putComment)


module.exports = commentRouter;