const { Router } = require('express')

const router = Router()

const videosController = require('../controllers/videosController')

// --- GET
router.get('/', videosController.getVideos)

// ---- POST
router.post('/:courseId', videosController.postVideos)

// ---- PUT
router.put('/:id', videosController.putVideoId)
router.put('/restore/:id', videosController.restoreAVideo)

// ---- DELETE 
router.delete('/:id', videosController.deleteAVideo)

module.exports = router;