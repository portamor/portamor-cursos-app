const courseService        = require("./courseService.js");
const { Sections, Videos } = require("../database.js");

const createSection = async (name, courseId) => {
  const courseFound = await courseService.getCourseById(courseId)
  
  const newSection = await Sections.create({ name: name, });

  newSection.setCourse(courseFound)

  return newSection;
};

const getSectionById = async (sectionId) => {
  const sectionById = await Sections.findByPk(sectionId, {
    include: [{ model: Videos }],
    paranoid: false 
  });
  return sectionById;
};

const getSectionsByCourseId = async (courseId) => {
  const sections = await Sections.findAll({
    where: { CourseId: courseId },
    include: [{ model: Videos }],

  });
  return sections;
};

const putSection = async ({ id, data }) => {
  const sectionFound = await getSectionById(id);
  sectionFound.set(data);
  await sectionFound.save();
  return sectionFound;
};

const getAllSection = async ()=> {
  const sections = await Sections.findAll()
  return sections
}

const deleteSection = async (id) => {
  const sectionFound = await getSectionById(id);
  await sectionFound.destroy();
};

const restoreSection = async (id) => {
  await Sections.restore({
    where: { id: id },
  });
  const restoredSection = await getSectionById(id);
  return restoredSection;
};

module.exports = {
  createSection,
  getSectionById,
  getSectionsByCourseId,
  putSection,
  deleteSection,
  restoreSection,
  getAllSection
};
