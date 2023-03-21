const {Router} = require('express');

const router = Router()

/* ==================== Import Controllers ======================== */

const {
getUsers,
postUser
} = require('../controllers/usersController.js')


//.-----users
router.get('/', getUsers )
router.post('/', postUser)


module.exports = router;