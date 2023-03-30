const courseService  = require("../services/courseService");
const sectionService = require("../services/sectionService");

const postSection = async (req, res) => {
  try {
    const { name }     = req.body;
    const { courseId } = req.params;

    if(!name) throw new Error("Estan faltando valores para crear un curso")

    const foundCourse = await courseService.getCourseById(courseId);

    if(!foundCourse) throw new Error(`No se ha encontrado ningun curso con el ID: ${courseId}`);

    const createdSection = await sectionService.createSection(name, courseId);

    res.status(200).json({ message: "Seccion creada correctamente", data: createdSection });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getASectionById = async (req, res) => {
  const { sectionId } = req.params;
  try {
    const sectionsIdFouns = await sectionService.getSectionById(sectionId);

    if(!sectionsIdFouns.length) throw new Error(`No se encontro la seccion con el id ${sectionId}`)

    res.status(200).json(sectionsIdFouns);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const sectionFound = sectionService.getSectionById(sectionId);
    if (!sectionFound) {
      throw new Error(`No se encontro la section con el id ${id}`);
    }
    const updateSection = await sectionService.putSection({
      id: sectionId,
      data: req.body,
    });
    res.status(200).json(updateSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteASection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const sectionFound = sectionService.getSectionById(sectionId);
    if (!sectionFound) {
      throw new Error(`No se encontro la section con el id ${id}`);
    }
    await courseService.deleteACourse(id);
    res
      .status(200)
      .json({ message: `Se ha eliminado el curso ${id} correctamente` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const restoreSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const sectionFound = sectionService.getSectionById(sectionId);
    if (!sectionFound) {
      throw new Error(`No se encontro la section con el id ${id}`);
    }
    await sectionService.restoreSection(id);
    res.status(200).json({ message: "La section se ha restaurado con éxito" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getASectionById,
  postSection,
  putSection,
  deleteASection,
  restoreSection,
};
