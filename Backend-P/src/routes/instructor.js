const {Router} = require('express');

const router = Router()

const { getInstructor, postInstructor } = require('../controllers/instructorController');

router.get('/', getInstructor);
router.post('/', postInstructor);

module.exports = router;