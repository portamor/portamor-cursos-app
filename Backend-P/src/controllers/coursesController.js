const courseService = require("../services/courseService");

const postCourse = async (req, res) => {
  try {
    const { title } = req.body;

    if(!title || !req.body.description || !req.body.image || !req.body.genre) {
      throw new Error("Estan faltando valores para crear un curso")
    }

    const foundCourses = await courseService.getCourseByTitle(title);

    if(foundCourses.length) {
      for (const course of foundCourses) {
        if(course.title === title) throw new Error("Ya existe un curso con este nombre")
      }
    }

    const createdCourse = await courseService.createCourse(req.body);

    res.status(200).json({ message: "Curso creado con exito", data: createdCourse});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();

    if (!courses.length) throw new Error('No se ha encontrado ningun curso')
    
    res.status(200).json({message: "Cursos encontrados con exito", data: courses});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const {id} = req.params;

    const foundCourse = await courseService.getCourseById(id)

    if(!foundCourse) throw new Error(`No se encontro curso con el ID: ${id}`)

    res.status(200).json({ message: "Curso encontrado con exito", data: foundCourse})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

const getCourseByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    const courseTitle = await courseService.getCourseByTitle(title);

    if(!courseTitle.length) {
      throw new Error(`No se ha encontrado ningun curso con el titulo ${title}`)
    } 

    res.status(200).json({ message: "Curso encontrado con exito", data: courseTitle });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCourseByType = async (req, res) => {
  try {
    const { type } = req.params;

    const foundCourse = await courseService.getCourseByType(type);

    if(!foundCourse.length) {
      throw new Error(`No se ha encontrado ningun curso con el type ${type}`)
    } 

    res.status(200).json({ message: "Curso encontrado con exito", data: foundCourse });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCourseByGenre = async (req, res) => {
  try {
    const { genre } = req.params;

    const foundCourses = await courseService.getCourseBygenre(genre);

    if(!foundCourses.length) throw new Error(`No se ha encontrado ningun curso con el pilar ${genre}`)

    res.status(200).json({message: "Cursos encontrado con exito", data: foundCourses});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const putCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const courseFound = courseService.getCourseById(id);
    
    if (!courseFound) throw new Error(`No se encontro curso con el id ${id}`);
    
    const updateCourse = await courseService.updateCourse({
      id: id,
      data: req.body,
    });

    res.status(200).json({message: "Curso actualizado con exito", data: updateCourse});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteACourse = async (req, res) => {
  try {
    const { id } = req.params;
    const foundCourse = await courseService.getCourseById(id);
    if (!foundCourse) {
      throw new Error(`No hay curso con el id ${id}`);
    }
    await courseService.deleteACourse(id);
    res
      .status(200)
      .json({ message: `Se ha eliminado el curso ${id} correctamente` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const restoreCouse = async (req, res) => {
  try {
    const { id } = req.params;
    const foundCourse = await courseService.getCourseById(id);
    if (!foundCourse) {
      throw new Error(`No hay curso con el id ${id}`);
    }
    await courseService.restoreACourse(id);
    res.status(200).json({ message: "El curso se ha restaurado con éxito" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  postCourse,
  getAllCourses,
  getCourseById,
  getCourseByTitle,
  getCourseByType,
  getCourseByGenre,
  putCourse,
  deleteACourse,
  restoreCouse
};
