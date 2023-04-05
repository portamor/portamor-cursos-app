const {Router} = require('express');

const router = Router()

/* ==================== Import Controllers ======================== */

const usersController = require('../controllers/usersController.js')


//.-----GET
router.get('/', usersController.getUsers)
router.get('/:userId', usersController.getUserById);

// ----POST
router.post('/', usersController.postUser)
router.post('/inscription/:userId/:courseId', usersController.postInscription)

// ----PUT
router.put('/:userId', usersController.userPut)
router.put('/restore/:userId')

// ----DELETE
router.delete('/:userId')

module.exports = router;