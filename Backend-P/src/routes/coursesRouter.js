const { Router }        = require("express");
const coursesController = require("../controllers/coursesController.js");
const courseRouter      = Router();

// ---- POST
courseRouter.post("/", coursesController.postCourse);

// ---- GET
courseRouter.get("/",             coursesController.getAllCourses);
courseRouter.get("/id/:id",       coursesController.getCourseById)
courseRouter.get("/title",        coursesController.getCourseByTitle);
courseRouter.get("/type",         coursesController.getCourseByType);
courseRouter.get("/genre/:genre", coursesController.getCourseByGenre);
courseRouter.get("/videos/:id",   coursesController.getCourseVideo);

// ---- PUT
courseRouter.put("/:id",         coursesController.putCourse);
courseRouter.put("/restore/:id", coursesController.restoreCourse);

// ----DELETE
courseRouter.delete("/:id", coursesController.deleteACourse);



module.exports = courseRouter;
