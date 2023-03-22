const {Videos} = require('../database.js')

const getVideos = async (req, res) => {
    
    try {
        
        const allVideos = await Videos.findAll()
        
        if(allVideos.length) {
            res.status(200).json(allVideos)
        } else {
            res.status(202).json({massage: 'No hay videos en la base de datos'})
        }        
    } catch (error) {
        console.log('error al obtener los videos', error)
    }
}

const postVideos = async (req, res)  => {
    const { videoTitle, videoLink, videoDescription  } = req.body;

    try {
        const bodyVideo = {
            videoTitle, videoLink, videoDescription
        }

        let createVideo = await Videos.create(bodyVideo)

        res.status(200).json(createVideo)
        
    } catch (error) {
        console.log('error al crear el video', error)
    }
}

module.exports = {
    getVideos,
    postVideos
}