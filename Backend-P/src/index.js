const {Router } = require('express');

const router = Router();

const usersRouter      = require('./routes/users')
const coursesRouter    = require('./routes/courses')
const videosRouter     = require('./routes/videos')
const instructorRouter = require('./routes/instructor')
const commentRouter    = require('./routes/comments')
const sectionRouter    = require('./routes/sections')

router.use('/users',      usersRouter)
router.use('/courses',    coursesRouter);
router.use('/videos',     videosRouter)
router.use('/instructor', instructorRouter)
router.use('/comments',   commentRouter )
router.use('/section', sectionRouter)

module.exports = router