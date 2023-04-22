const {Router } = require('express');

const router = Router();

const usersRouter      = require('./usersRouter')
const coursesRouter    = require('./coursesRouter')
const videosRouter     = require('./videosRouter')
const instructorRouter = require('./instructorRouter')
const reviewRouter     = require('./reviewRouter')
const sectionRouter    = require('./sectionsRouter')
const videoStateRouter = require('./videoStateRouter')

router.use('/users',      usersRouter);
router.use('/courses',    coursesRouter);
router.use('/videos',     videosRouter);
router.use('/instructor', instructorRouter)
router.use('/review',     reviewRouter)
router.use('/section',    sectionRouter)
router.use('/state',      videoStateRouter)

module.exports = router