const {Router} = require('express');

const router = Router()

const {getCourses, postCourse} = require('../controllers/coursesController.js');

router.get('/', getCourses);
router.post('/', postCourse);

module.exports = router;
