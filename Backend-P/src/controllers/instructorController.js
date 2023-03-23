const courseService     = require("../services/courseService")
const instructorService = require("../services/instructorService")

const postInstructor = async (req, res) => {
  try {
    const data = req.body;
    const { courseId } = req.params;

    const foundCourse = await courseService.getCourseById(courseId)

    if(!foundCourse) {
      throw new Error(`No se ha encontrado ningun curso con el ID: ${courseId}`)
    }

    if(
      !data.instructorName   || 
      !data.instructorScore  || 
      !data.instructorReview || 
      !data.instructorDescription
    ) {
      throw new Error("Estan faltando valores para crear un comentario")
    }

    const createdInstructor = await instructorService.createIntructorInDB({
      courseId: courseId,
      data: data
    })

    res.status(200).json({message: "Instructor creado con exito", data: createdInstructor});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const getInstructor = async (req, res) => {
//   try {
//     const allInstructor = await Instructor.findAll();

//     if (allInstructor.length) {
//       res.status(200).json(allInstructor);
//     } else {
//       res.status(202).json({message: "No hay instructores"});
//     }
//   } catch (error) {
//     console.log("error al crear Instructor", error);
//   }
// };

module.exports = {
  postInstructor,
  // getInstructor,
};
