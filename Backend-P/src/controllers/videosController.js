const { getCourseById } = require("../services/courseService");
const videoService = require("../services/videoService.js");


// Probar manejo de errores, respuesta exitosa y demnas en insomnia, postman, etc
const getVideos = async (req, res) => {
  try {
    const allVideos = await videoService.getAllVideos();

    if(!allVideos.length) throw new Error('No ha encontrado ningun video')

    //En los controllers es buena practica poner un mensaje y un objeto con los datos 
    //pedidos. Esto hace que la respuesta sea completa y util al usuario. Ej:
    // res.status(200).json({ message: "Videos encontradas con exito", data: allVIdeos })
    
    res.status(200).json(allVideos);
  } catch (error) {
    console.log("error al obtener los videos", error);
  }
};

// Probar manejo de errores, respuesta exitosa y demnas en insomnia, postman, etc
const postVideos = async (req, res) => {
  try {
    const { videoTitle, videoLink, videoDescription } = req.body;
    //videoLink no hace falta. Eso se maneja desde el route de React.
    //En el link se pone: <Link to={video/´${video.id}´} > y listo
    
    // En el modelo no hace falta poner videoDescription, videoTitile
    // Las propiedades son unicas de ese video. No se van a pisar con las otras. 

    const { courseId } = req.params;

    //No se verifica si en el mismo curso ya existe un video con el nombre de req.body

    const courseFound = await getCourseById(courseId);
    
    if (!courseFound) {
      throw new Error(`No se ha encontrado ningun curso con este ID: ${courseId}`);
    }
    
    const createVideo = await videoService.createVideo({
      videoTitle,
      videoLink,
      videoDescription,
      courseId: courseFound.id,
    });

      //En los controllers es buena practica poner un mensaje y un objeto con los datos 
    //pedidos. Esto hace que la respuesta sea completa y util al usuario. Ej:
    // res.status(200).json({ message: "Videos encontradas con exito", data: allVIdeos })
    res.status(200).json(createVideo);
  } catch (error) {
    console.log("error al crear el video", error.massage);
  }
};

// Probar manejo de errores, respuesta exitosa y demnas en insomnia, postman, etc
const putVideoId = async (req, res) => {
  try {
    const { idVideo } = req.params;// Desde params NO llega ningun 'idVideo' ??? Recibe 'id'

    //No se chqequea si existe un video en la BD con el id recibido

    const updateVideo = await videoService.putVideo({
      id: idVideo,
      data: req.body,
    });

     //En los controllers es buena practica poner un mensaje y un objeto con los datos 
    //pedidos. Esto hace que la respuesta sea completa y util al usuario. Ej:
    // res.status(200).json({ message: "Videos encontradas con exito", data: allVIdeos })
    res.status(200).json(updateVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Probar manejo de errores, respuesta exitosa y demnas en insomnia, postman, etc
const deleteAVideo = async (req, res) => {
  try {
    const { id } = req.params;
    //No se verifica si existe un curso con el id recibido

    const deleteVideo = await videoService.deleteVideo(id);

    res.status(200).json({ message: "Video eliminado con éxito" });
  } catch (error) {
    req.status(400).json({ message: error.message });
  }
};

// Probar manejo de errores, respuesta exitosa y demnas en insomnia, postman, etc
const restoreAVideo = async (req, res) => {
  try {
    const { id } = req.params; //Aca recibe 'id' y arriba es 'idVideo'?

    //No se verifica si existe un video con el id recibido

    //No se verifica si el video no estaba boorado

    //Los timestamps en el modelo videos estan en falso. Si esta propiedad
    //esta en false NO ES paranoid. Por lo tanto no se puede restaurar

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
