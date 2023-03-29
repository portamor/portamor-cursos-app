const {Router } = require('express');

const router = Router();

const usersRouter      = require('./routes/usersRouter')
const coursesRouter    = require('./routes/coursesRouter')
const videosRouter     = require('./routes/videosRouter')
const instructorRouter = require('./routes/instructorRouter')
const commentRouter    = require('./routes/commentsRouter')
const sectionRouter    = require('./routes/sectionsRouter')

router.use('/users',      usersRouter)
router.use('/courses',    coursesRouter);
router.use('/videos',     videosRouter)
router.use('/instructor', instructorRouter)
router.use('/comments',   commentRouter )
router.use('/section',    sectionRouter)

module.exports = router