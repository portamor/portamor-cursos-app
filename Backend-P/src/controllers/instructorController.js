const courseService     = require("../services/courseService")
const instructorService = require("../services/instructorService")

const postInstructor = async (req, res) => {
  try {
    const { courseId } = req.params;

    const foundCourse = await courseService.getCourseById(courseId)

    if(!foundCourse) {
      throw new Error(`No se ha encontrado ningun curso con el ID: ${courseId}`)
    }

    if( !req.body.name || !req.body.review || !req.body.profile_picture) {
      throw new Error("Estan faltando valores para crear un comentario")
    }

    const createdInstructor = await instructorService.createIntructorInDB({
      courseId: courseId,
      data: req.body
    })

    res.status(201).json({message: "Instructor creado con exito", data: createdInstructor});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllInstructor = async (req, res) => {
  try {
    const allInstructors = await instructorService.getAllIntructorFromDB();

    if (!allInstructors.length) throw new Error("No se ha encontrado ningun instructor")

    res.status(200).json({ message: "Instructores encontrados con exito", data: allInstructors });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  postInstructor,
  getAllInstructor,
};
