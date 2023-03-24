const { Router } = require("express");
const coursesController = require("../controllers/coursesController.js");

const router = Router();

// ---- POST
router.post("/", coursesController.postCourse);

// ---- GET
router.get("/", coursesController.getCourses);

// ---- GET BY TITLE
router.get("/title/:title", coursesController.getCourseTitle);

// ---- GET BY TYPE
router.get("/type/:typeCourse", coursesController.getCourseType);

// ---- GET BY GENRE
router.get("/genre/:genreCourse", coursesController.getCourseGenre);

// ---- PUT
router.put("/", coursesController.putCourse);
router.put("/restore/:id", coursesController.restoreCouse);

// ----DELETE
router.delete("/", coursesController.deleteACourse);

module.exports = router;
