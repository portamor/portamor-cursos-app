const sectionService = require("../services/sectionService");

const getSectionsByIdCourses = async (req, res) => {
  const { courseId } = req.params;
  try {
    const sections = await sectionService.getSectionsByCourseId(courseId);
    res.status(200).json(sections);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getASectionById = async (req, res) => {
  const { sectionId } = req.params;
  try {
    const sectionsIdFouns = await sectionService.getSectionById(sectionId);
    res.status(200).json(sectionsIdFouns);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postSection = async (req, res) => {
  const { nameSection } = req.body;
  const { courseId } = req.params;
  try {
    const newInfo = { nameSection, courseId };
    const newSection = await sectionService.createSection(newInfo);
    res.status(200).json(newSection);
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
  getSectionsByIdCourses,
  postSection,
  putSection,
  deleteASection,
  restoreSection,
};
