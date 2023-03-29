const {Router}             = require("express");
const instructorRouter     = Router();
const instructorController = require("../controllers/instructorController");

//---- POST
instructorRouter.post("/:courseId", instructorController.postInstructor);
//---- GET
instructorRouter.get ("/", instructorController.getAllInstructor);
//---- PUT
instructorRouter.put ("/:instructorId", instructorController.putInstructor);
instructorRouter.put ("/relation/:instructorId/:courseId", instructorController.relationInstructorWithCourse);

module.exports = instructorRouter;
