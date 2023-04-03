const { Router }       = require('express')
const videoRouter      = Router()
const videoController = require('../controllers/videosController')

// ---- POST
videoRouter.post('/:sectionId', videoController.postVideos)

// --- GET
videoRouter.get('/', videoController.getVideos)

// ---- PUT
videoRouter.put('/:idVideo',         videoController.putVideoId)
videoRouter.put('/restore/:idVideo', videoController.restoreAVideo)

// ---- DELETE 
videoRouter.delete('/:idVideo', videoController.deleteAVideo)

module.exports = videoRouter;