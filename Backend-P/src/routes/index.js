const {Router } = require('express');

const router = Router();

const usersRouter      = require('./users')
const coursesRouter    = require('./courses')
const videosRouter     = require('./videos')
const instructorRouter = require('./instructorRouter')
const reviewRouter     = require('./reviewRouter')
const sectionRouter    = require('./routes/sectionsRouter')

router.use('/users',      usersRouter);
router.use('/courses',    coursesRouter);
router.use('/videos',     videosRouter);
router.use('/instructor', instructorRouter)
router.use('/review',     reviewRouter)
router.use('/section',    sectionRouter)

module.exports = router