const { Router } = require("express");
const coursesController = require("../controllers/coursesController.js");

const router = Router();

// ---- POST
router.post("/", coursesController.postCourse);

// ---- GET
router.get("/",             coursesController.getAllCourses);
router.get("/id/:id",       coursesController.getCourseById)
router.get("/title/:title", coursesController.getCourseByTitle);
router.get("/type/:type",   coursesController.getCourseByType);
router.get("/genre/:genre", coursesController.getCourseByGenre);

// ---- PUT
router.put("/:id",         coursesController.putCourse);
router.put("/restore/:id", coursesController.restoreCourse);

// ----DELETE
router.delete("/:id", coursesController.deleteACourse);



module.exports = router;
