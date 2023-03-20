const {Router } = require('express');

const users = require('./routes/users')
const courses = require('./routes/courses')

const router = Router();

router.use('/users', users)
router.use('/courses', courses);




module.exports = router