const {Router} = require('express');

const router = Router()

/* ==================== Import Controllers ======================== */

const usersController = require('../controllers/usersController.js')


//.-----GET
router.get('/', usersController.getUsers )

// ----POST
router.post('/', usersController.postUser)

// ----PUT
router.put('/:id', usersController.userPut)

module.exports = router;