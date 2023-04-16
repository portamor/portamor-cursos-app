const { getSectionById } = require("../services/sectionService");
const videoService = require("../services/videoService.js");


const getVideos = async (req, res) => {
  try {
    const allVideos = await videoService.getAllVideos();
    if (!allVideos.length) {
      throw new Error("No ha encontrado ningun video");
    }
    res
      .status(200)
      .json({ message: "Videos obtenidos con éxito", data: allVideos });
  } catch (error) {
    res.status(400).json({ messege: error.massage });
  }
};

const getVideoById = async(req,res) => {
  try {
    const { idVideo } = req.params; 
    
    const foundVideo = await videoService.getVideoById(idVideo)

    if(!foundVideo) throw new Error(`No se ha encontrado ningun video con el ID: ${idVideo}`)

    res.status(200).json({message: "Video encontrado con exito", data: foundVideo})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
};

const postVideos = async (req, res) => {
  try {
    const { videoTitle, videoLink, videoDescription } = req.body;
    const { sectionId } = req.params;
    const videoByTitle = await videoService.getVideoByTitle(videoTitle);
    if (videoByTitle.length) {
      throw new Error("Ya existe un video con ese titulo");
    }
    const sectionFound = await getSectionById(sectionId);

    if (!sectionFound) {
      throw new Error(
        `No se ha encontrado ninguna section con este ID: ${sectionId}`
      );
    }

    const createVideo = await videoService.createVideo( sectionId, {
      videoTitle,
      videoLink,
      videoDescription,
    });
    res
      .status(200)
      .json({ message: "Video creado con éxtio", data: createVideo });
  } catch (error) {
    res.status(402).json({ messege: error.message });
  }
};

const putVideoId = async (req, res) => {
  try {
    const { idVideo } = req.params; 
    const videoById = await videoService.getVideoById(idVideo);
    if (!videoById) {
      throw new Error(`No se encontro el video con id ${idVideo}`);
    }
    const updateVideo = await videoService.putVideo({
      id: idVideo,
      data: req.body,
    });
    res
      .status(200)
      .json({
        message: `El video con el id ${idVideo} se ha actualizado`,
        data: updateVideo,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAVideo = async (req, res) => {
  try {
    const { idVideo } = req.params;
    const videoById = await videoService.getVideoById(idVideo);
    if (!videoById) {
      throw new Error(`No se encontro el video con id ${idVideo}`);
    }
    const deleteVideo = await videoService.deleteVideo(idVideo);

    res.status(200).json({ message: "Video eliminado con éxito" });
  } catch (error) {
    req.status(400).json({ message: error.message });
  }
};

const restoreAVideo = async (req, res) => {
  try {
    const { idVideo } = req.params; //Aca recibe 'id' y
    const videoById = await videoService.getVideoById(idVideo);
    if (!videoById) {
      throw new Error(`No se encontro el video con id ${idVideo}`);
    }
    if (videoById.deleteAt === null) {
      throw new Error(`El video con el id ${idVideo} no habia sido eliminado`);
    }
    await videoService.restoreVideo(idVideo);

    res.status(200).json({ message: "Video restaurado con exito", data: videoById });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getVideos,
  getVideoById,
  postVideos,
  putVideoId,
  deleteAVideo,
  restoreAVideo,
};
