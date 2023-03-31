const { Videos } = require("../database.js");

const createVideo = async ({
  SectionId,
  videoLink,
  videoTitle,
  videoDescription,
}) => {
  const newVideo = await Videos.create({
    //CONST FOUNDSECTION = SECTIONSERVICE.GETSECTIONBYID(SECTIONID)->LINEA 16
    videoTitle,
    videoLink,
    videoDescription,
    SectionId: SectionId, //Asi no se hace la relacion. Linea 9,
  });
  // AWAIT NEWVIDEO.SETSECTION(FOUNDSECTION)
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
   // Hay que enviar al controller el video restaurado asi lo puede mandar en la response
};

module.exports = {
  createVideo,
  getAllVideos,
  putVideo,
  deleteVideo,
  restoreVideo
};
