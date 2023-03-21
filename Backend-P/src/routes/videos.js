const { Router } = require('express')

const router = Router()

const {
    getVideos,
    postVideos
} = require('../controllers/videosController')

router.get('/', getVideos)
router.post('/', postVideos)

module.exports = router;