const { Videos, Sections } = require("../database.js");
const sectionService = require('../services/sectionService.js')
const {Op} = require('sequelize')

const createVideo = async ( sectionId,{
  videoLink,
  videoTitle,
  videoDescription,
}) => {
  const newVideo = await Videos.create({
    videoTitle,
    videoLink,
    videoDescription,
  });
  const foundSection = await sectionService.getSectionById(sectionId)
  await newVideo.setSection(foundSection)
  return newVideo;
};

const getAllVideos = async () => {
  const allVideos = await Videos.findAll();
  return allVideos;
};

const getVideoById = async (id) => {
  const videoId = await Videos.findByPk(id);
  return videoId;
};

const getVideoByTitle = async (videoTitle) => {
  const videoByTitle = await Videos.findAll({
    where: { videoTitle: videoTitle },
    order: [["videoTitle", "ASC"]],
  });
  return videoByTitle;
};

const searchVideoByTitle = async (videoTitle) => {
  const titleNoExactly = await Videos.findAll({
    where: {
      videoTitle: {
        [Op.iLike]: `%${videoTitle}%`,
      },
    },
  });
  return titleNoExactly;
};

const putVideo = async ({ id, data }) => {
  const videosForCourse = await getVideoById(id);
  videosForCourse.set(data);
  await videosForCourse.save();
  return videosForCourse;
};

const deleteVideo = async (id) => {
  const videosForCourse = await getVideoById(id);
  await videosForCourse.destroy();
  return 'Video eliminado correctamente'
};

const restoreVideo = async (id) => {
  await Videos.restore({
    where: { id: id },
  });
  const videoRestored = await getVideoById(id);
  return videoRestored;
};

module.exports = {
  createVideo,
  getAllVideos,
  putVideo,
  deleteVideo,
  restoreVideo,
  getVideoByTitle,
  getVideoById,
  searchVideoByTitle
};
