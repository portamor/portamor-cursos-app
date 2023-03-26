const { Videos } = require("../database.js");

const createVideo = async ({
  courseId,
  videoLink,
  videoTitle,
  videoDescription,
}) => {
  const newVideo = await Videos.create({
    videoTitle,
    videoLink,
    videoDescription,
    CourseId: courseId,
  });
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

const putVideo = async ({ id, data }) => {
  const videosForCourse = await getVideoById(id);
  videosForCourse.set(data);
  await videosForCourse.save();
  return videosForCourse;
};

const deleteVideo = async (id) => {
  const videosForCourse = await getVideoById(id);
  await videosForCourse.destroy();
};

const restoreVideo = async (id) => {
   await Videos.restore({
    where: {id: id}
   })
};

module.exports = {
  createVideo,
  getAllVideos,
  putVideo,
  deleteVideo,
  restoreVideo
};
