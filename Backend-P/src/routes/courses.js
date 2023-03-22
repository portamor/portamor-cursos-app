const {Router} = require('express');

const router = Router()

const coursesController = require('../controllers/coursesController.js');
const commentController = require('../controllers/commentController')

// ---- POST
router.post('/',             coursesController.postCourse);
router.post('/:id/comments', commentController.postComment);

// ---- GET
router.get('/', coursesController.getCourses);

module.exports = router;
