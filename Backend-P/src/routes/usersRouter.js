const { Router }      = require('express');
const userRouter      = Router()
const usersController = require('../controllers/usersController.js')

userRouter.get('/',                   usersController.getUsers)
userRouter.get('/:userId',            usersController.getUserById);
userRouter.get('/course/:courseId',   usersController.getUsersByCourseId);
userRouter.get('/my-courses/:userId', usersController.getCoursesOfUser);

userRouter.post('/', usersController.postUser)

userRouter.put('/:userId',         usersController.userPut)
userRouter.put('/restore/:userId', usersController.restoreAUser)

userRouter.delete('/:userId', usersController.deleteAuser)

module.exports = userRouter;