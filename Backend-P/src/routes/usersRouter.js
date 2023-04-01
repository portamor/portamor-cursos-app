const {Router} = require('express');

const router = Router()

/* ==================== Import Controllers ======================== */

const usersController = require('../controllers/usersController.js')


//.-----GET
<<<<<<< HEAD
router.get('/', usersController.getUsers )
=======
router.get('/', usersController.getUsers)
router.get('/:userId', usersController.getUserById);
>>>>>>> 52d50b3fe9418b7ff2051856779f393fe903434b

// ----POST
router.post('/', usersController.postUser)

// ----PUT
router.put('/:userId', usersController.userPut)
router.put('/restore/:userId')

// ----DELETE
router.delete('/:userId')

module.exports = router;