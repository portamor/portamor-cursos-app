const courseService = require("../services/courseService");

const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    if (courses) {
      res.status(200).json(courses);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCourseTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const courseTitle = await courseService.getCourseByTitle(title);
    res.status(200).json(courseTitle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCourseType = async (req, res) => {
  try {
    const { typeCourse } = req.query;
    const courseType = await courseService.getCourseByType(typeCourse);
    res.status(200).json(courseType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCourseGenre = async (req, res) => {
  try {
    const { genreCourse } = req.query;
    const courseGenre = await courseService.getCourseBygenre(genreCourse);
    res.status(200).json(courseGenre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postCourse = async (req, res) => {
  const {
    title,
    image,
    typeCourse,
    goals,
    description,
    rating,
    materials,
    testimony,
    methodology,
    genreCourse,
  } = req.body;

  try {
    const newInfoCourse = {
      title,
      image,
      typeCourse,
      goals,
      description,
      rating,
      materials,
      testimony,
      methodology,
      genreCourse,
    };
    const createCourse = await courseService.createACourse(newInfoCourse);
    res.status(200).json(createCourse);
  } catch (error) {
    console.log("Error al crear el curso", error);
  }
};

const putCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const courseFound = courseService.getCourseById(id);
    if (!courseFound) {
      throw new Error(`No se encontro curso con el id ${id}`);
    }
    const updateCourse = await courseService.updateCourse({
      id: id,
      data: req.body,
    });
    res.status(200).json(updateCourse);
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
  getCourses,
  getCourseTitle,
  getCourseType,
  getCourseGenre,
  postCourse,
  putCourse,
  deleteACourse,
  restoreCouse
};
