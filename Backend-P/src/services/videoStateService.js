const {Courses, Videos, Users,VideoState} = require('../database.js')
const {Op} = require('sequelize')

const createVideoState = async (userId, videoId, watched, courseId) => {
    try {
      const searVideoState = await findVideoStateByUserAndVideo(userId, videoId)
      if(searVideoState) throw new Error('Ya se vio con anterioridad')
      const videoState = await VideoState.create({
        userId: userId,
        videoId: videoId,
        watched: watched,
        courseId: courseId
      });
      return videoState;
    } catch (error) {
      console.error(error);
    }
  };
  
  const findVideoStateByUserAndVideo = async (userId, videoId) => {
    try {
      const videoState = await VideoState.findOne({
        where: { userId: userId, videoId: videoId },
      });
      return videoState;
    } catch (error) {
      console.error(error);
    }
  };

  const findVideoStatesByUserAndCourse = async (userId, courseId) => {
    try {
      const videoStates = await VideoState.findAll({
        where: { userId: userId, courseId: courseId },
      });
      return videoStates;
    } catch (error) {
      console.error(error);
    }
  };
  
  
  module.exports = {
    createVideoState,
    findVideoStateByUserAndVideo,
    findVideoStatesByUserAndCourse
  }