const { Op } = require('sequelize');
const {Courses} = require('../database.js')

const getCourses = async (req, res) => {

    const { title, typeCourse, genreCourse, page, limit } = req.query

    if(!page){ let  page = 1}
    if(!limit) {let limit = 5}

    // page = parseInt(page)
    // limit = parseInt(limit)


    if(!title && !typeCourse && !genreCourse ) {
        try {
            const allCourses = await Courses.findAll()
            if (allCourses.length) {
                res.status(200).json(allCourses)
            } else {
                res.status(201).json({message : 'No hay cursos en la base de datos'})
            }
            
        } catch (error) {
            console.log('error al obtener cursos',error)
        }
    }
    if (title && !typeCourse && !genreCourse) {
        try {
            const titleCourse = await Courses.findAll({
                where: {
                    title: {
                        [Op.iLike]: `%${title}%`
                    }
                },
                order: [['title', 'ASC']]
            });
            if(titleCourse.length){
                res.status(200).json({
                curses : titleCourse,
                total: titleCourse.length
            })
            } else {
                res.status(202).json({message: 'No hay coincidencias'})
            }
            
        } catch (error) {
            console.log('error filtrar curso por title', error)
        }
    }
};

const postCourse = async (req, res)=> {

    const { title, image, typeCourse, goals, description, rating, materials, testimony, methodology, genres } = req.body;

    try {
        const newInfoCourse = {
            title, 
            image, 
            typeCourse,
            goals,
            description, 
            rating, 
            materials, 
            testimony, 
            methodology,
            genres 
        }

        const createCourse = await Courses.create(newInfoCourse)


        res.status(200).json(createCourse)


    } catch (error) {
        console.log('Error al crear el curso', error)
    }
};

module.exports = {
    getCourses,
    postCourse
}