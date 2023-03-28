const courseService     = require("../services/courseService")
const instructorService = require("../services/instructorService")

const postInstructor = async (req, res) => {
  try {
    const { courseId } = req.body;

    if( !req.body.name || !req.body.reviews || !req.body.profile_picture) {
      throw new Error("Estan faltando valores para crear un instructor")
    }

    const foundCourse = await courseService.getCourseById(courseId);

    if(!foundCourse) {
      throw new Error(`No se ha encontrado ningun curso con el ID: ${courseId}`)
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

const getInstructorById = async (req, res) => {
  try {
    const { instructorId } = req.params;

    const foundInstructor = await instructorService.getInstructorById(instructorId);

    if (!foundInstructor) {
      throw new Error(`No se ha encontrado ningun instructor con el ID: ${instructorId}`)
    }

    res.status(200).json({ message: "Instructor encontrado con exito", data: foundInstructor });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllInstructors = async (req, res) => {
  try {
    const allInstructors = await instructorService.getAllIntructorFromDB();

    if (!allInstructors.length) throw new Error("No se ha encontrado ningun instructor")

    res.status(200).json({ message: "Instructores encontrados con exito", data: allInstructors });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const putInstructor = async (req, res) => {
  try {
    const { instructorId } = req.params;

    const foundInstructor = await instructorService.getInstructorById(instructorId);

    if (!foundInstructor) {
      throw new Error(`No se ha encontrado ningun instructor con el ID: ${instructorId}`)
    }

    const updatedInstructor = await instructorService.updateInstructor({
      id: instructorId,
      data: req.body
    })

    res.status(200).json({ message: "Instructor actualizado con exito", data: updatedInstructor });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const relationInstructorWithCourse = async (req, res) => {
  try {
    const { instructorId, courseId } = req.params;

    const foundInstructor = await instructorService.getInstructorById(instructorId);
    const foundCourse = await courseService.getCourseById(courseId);
    
    if (!foundInstructor) {
      throw new Error(`No se ha encontrado ningun instructor con el ID: ${instructorId}`)
    }
    if (!foundCourse) {
      throw new Error(`No se ha encontrado ningun curso con el ID: ${courseId}`)
    }

    const updatedInstructor = await instructorService.addCourseToInstructor({
      instructorId: instructorId,
      courseId: courseId
    })

    res.status(200).json({ 
      message: `${updatedInstructor.name} será el instructor del curso ${foundCourse.title}`, 
      data: updatedInstructor 
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteInstructor = async (req, res) => {
  try {
    const { instructorId } = req.params;
    
    const foundInstructor = await instructorService.getInstructorById(instructorId);

    if(!foundInstructor) {
      throw new Error(`No se ha encontrado ningun instructor con el ID: ${instructorId}`)
    }

    await instructorService.deleteIntructorFromDB(instructorId)
    
    res.status(200).json({ message: "Instructor eliminado con exito" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// const restoreReview = async (req, res) => {
//   try {
//     const { reviewId } = req.params;
    
//     const foundReview = await reviewService.getReviewById(reviewId);

//     if(!foundReview) {
//       throw new Error(`No se ha encontrado ninguna opinion con el ID: ${reviewId}`);
//     }
//     if(foundReview.deletedAt === null) {
//       throw new Error("La opinion no habia sido eliminada anteriormente");
//     } 

//     const restoredReview = await reviewService.restoreReviewFromDB(reviewId);
    
//     res.status(200).json({ message: "Opinion restaurada con exito", data: restoredReview });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

module.exports = {
  postInstructor,
  getInstructorById,
  getAllInstructors,
  putInstructor,
  relationInstructorWithCourse,
  deleteInstructor,
};
