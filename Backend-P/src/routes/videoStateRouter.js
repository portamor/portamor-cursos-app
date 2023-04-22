const {Router} = require("express");
const videoStateController = require('../controllers/videoStateController');

const videoStateRouter  = Router()

//----POST 

videoStateRouter.post('/', videoStateController.postVideoState);

//----GET

videoStateRouter.get('uv/:userId/:videoId', videoStateController.getVideoState)
videoStateRouter.get('/:userId/:courseId', videoStateController.getVideoStatesByUserAndCourse)


module.exports = videoStateRouter;