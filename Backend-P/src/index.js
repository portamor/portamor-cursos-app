const {Router } = require('express');

const users = require('./routes/users')

const router = Router();

router.use('/users', users)




module.exports = router