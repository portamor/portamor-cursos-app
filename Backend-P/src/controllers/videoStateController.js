const videoStateService = require("../services/videoStateService")
const userService =require("../services/userService")
const videoService = require("../services/videoService")
const courseService = require("../services/courseService")


const postVideoState = async (req, res) => {
    try {
      const { userId, videoId, watched, courseId} = req.body;
  
      if (!userId || !videoId) throw new Error("Están faltando valores para crear el estado del video");
  
      const user = await userService.userById(userId);
  
      if (!user) throw new Error(`No se ha encontrado ningún usuario con el ID: ${userId}`);
  
      const video = await videoService.getVideoById(videoId);
  
      if (!video) throw new Error(`No se ha encontrado ningún video con el ID: ${videoId}`);
  
      const createdVideoState = await videoStateService.createVideoState(userId, videoId, watched, courseId);
  
      res.status(201).json({ message: "Estado de video creado correctamente", data: createdVideoState });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const getVideoState = async (req, res) => {
    try {
      const { userId, videoId } = req.params;
  
      if (!userId || !videoId) throw new Error("Están faltando valores para buscar el estado del video");
  
      const user = await userService.userById(userId);
  
      if (!user) throw new Error(`No se ha encontrado ningún usuario con el ID: ${userId}`);
  
      const video = await videoService.getVideoById(videoId);
  
      if (!video) throw new Error(`No se ha encontrado ningún video con el ID: ${videoId}`);
  
      const videoState = await videoStateService.findVideoStateByUserAndVideo(userId, videoId);
  
      res.status(200).json({ message: "Estado de video encontrado", data: videoState });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const getVideoStatesByUserAndCourse = async (req, res) => {
    try {
      const { userId, courseId } = req.params;
  
      if (!userId || !courseId) throw new Error("Faltan valores para buscar el estado de los videos");
  
      const user = await userService.userById(userId);
  
      if (!user) throw new Error(`No se ha encontrado ningún usuario con el ID: ${userId}`);
  
      const course = await courseService.getCourseById(courseId);
  
      if (!course) throw new Error(`No se ha encontrado ningún curso con el ID: ${courseId}`);
  
      const videoStates = await videoStateService.findVideoStatesByUserAndCourse(userId, courseId);
  
      res.status(200).json({ message: "Estados de video encontrados", data: videoStates });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

  module.exports ={
    postVideoState,
    getVideoState,
    getVideoStatesByUserAndCourse
  };