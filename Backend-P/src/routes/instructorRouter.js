const { Router }           = require("express");
const instructorRouter     = Router();
const instructorController = require("../controllers/instructorController");

//---- POST
instructorRouter.post("/", instructorController.postInstructor);

//---- GET
instructorRouter.get ("/",              instructorController.getAllInstructors);
instructorRouter.get ("/:instructorId", instructorController.getInstructorById);

//---- PUT
instructorRouter.put ("/:instructorId",            instructorController.putInstructor);
instructorRouter.put ("/restore/:instructorId",    instructorController.restoreInstructor);
instructorRouter.put ("/add-course/:instructorId", instructorController.addCourseToInstructor);

//---- DELETE
instructorRouter.delete ("/:instructorId", instructorController.deleteInstructor);

module.exports = instructorRouter;
