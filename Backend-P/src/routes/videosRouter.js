const { Router }       = require('express')
const videoRouter      = Router()
const videoController = require('../controllers/videosController')

// ---- POST
videoRouter.post('/:courseId', videoController.postVideos)

// --- GET
videoRouter.get('/', videoController.getVideos)

// ---- PUT
videoRouter.put('/:id',         videoController.putVideoId)
videoRouter.put('/restore/:id', videoController.restoreAVideo)

// ---- DELETE 
videoRouter.delete('/:id', videoController.deleteAVideo)

module.exports = videoRouter;