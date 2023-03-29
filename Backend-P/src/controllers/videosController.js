const { getCourseById } = require("../services/courseService");
const videoService = require("../services/videoService.js");

const getVideos = async (req, res) => {
  try {
    const allVideos = await videoService.getAllVideos();
    if(!allVideos.length) throw new Error('No hay videos en la base de datos')
    res.status(200).json(allVideos);
  } catch (error) {
    console.log("error al obtener los videos", error);
  }
};

const postVideos = async (req, res) => {
  try {
    const { videoTitle, videoLink, videoDescription } = req.body;
    const { courseId } = req.params;
    const courseFound = await getCourseById(courseId);
    if (!courseFound) {
      throw new Error(
        `No se ha encontrado ningun curso con este ID: ${courseId}`
      );
    }
    const createVideo = await videoService.createVideo({
      videoTitle,
      videoLink,
      videoDescription,
      courseId: courseFound.id,
    });
    res.status(200).json(createVideo);
  } catch (error) {
    console.log("error al crear el video", error.massage);
  }
};

const putVideoId = async (req, res) => {
  try {
    const { idVideo } = req.params;
    const updateVideo = await videoService.putVideo({
      id: idVideo,
      data: req.body,
    });
    res.status(200).json(updateVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteVideo = await videoService.deleteVideo(id);
    res.status(200).json({ message: "Video eliminado con éxito" });
  } catch (error) {
    req.status(400).json({ message: error.message });
  }
};

const restoreAVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await videoService.restoreVideo(id);
    res.status(200).json({ msg: "Comentario restaurado con exito" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getVideos,
  postVideos,
  putVideoId,
  deleteAVideo,
  restoreAVideo,
};
