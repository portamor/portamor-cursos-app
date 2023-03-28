const { Sections, Videos } = require("../database.js");

const getSectionsByCourseId = async (courseId) => {
  const sections = await Sections.findAll({
    where: { CourseId: courseId },
    include: [{ model: Videos }],
  });
  return sections;
};

const getSectionById = async (sectionId) => {
  const sectionById = await Sections.findByPk(sectionId, {
    include: [{ model: Videos }],
  });
  return sectionById;
};

const createSection = async ({ nameSection, CourseId }) => {
  const newSection = await Sections.create({
    nameSection,
    CourseId: CourseId,
  });
  return newSection;
};

const putSection = async ({ id, data }) => {
  const sectionFound = await getSectionById(id);
  sectionFound.set(data);
  await sectionFound.save();
  return sectionFound;
};

const deleteSection = async (id) => {
  const sectionFound = await getSectionById(id);
  await sectionFound.destroy();
};

const restoreSection = async (id) => {
  await Sections.restore({
    where: { id: id },
  });
};

module.exports = {
  getSectionsByCourseId,
  getSectionById,
  createSection,
  putSection,
  deleteSection,
  restoreSection
};
