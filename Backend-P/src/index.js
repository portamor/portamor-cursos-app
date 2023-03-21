const {Router } = require('express');

const users = require('./routes/users')
const courses = require('./routes/courses')
const videos = require('./routes/videos')
const instructor = require('./routes/instructor')

const router = Router();

router.use('/users', users)
router.use('/courses', courses);
router.use('/videos', videos )
router.use('/instructor', instructor )



module.exports = router