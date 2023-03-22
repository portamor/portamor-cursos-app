const {Router}          = require('express');
const coursesController = require('../controllers/coursesController.js');

const router = Router()

// ---- POST
router.post('/', coursesController.postCourse);

// ---- GET
router.get('/',  coursesController.getCourses);


module.exports = router;
