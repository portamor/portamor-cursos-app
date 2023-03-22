const { Op } = require('sequelize');
const {Courses} = require('../database.js')

const getCourses = async (req, res) => {

    const { title, typeCourse, genreCourse, } = req.query

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
            console.log('error buscar curso por title', error)
        }
    }
    if (!title && typeCourse && !genreCourse) {
        try {
            const typeofCourse = await Courses.findAll({
                where: {
                typeCourse : {
                        [Op.iLike]: `%${typeCourse}%`
                    }
                },
                order: [['title', 'ASC']]
            });
            if(typeofCourse.length){
                res.status(200).json({
                curses : typeofCourse,
                total: typeofCourse.length
            })
            } else {
                res.status(202).json({message: 'No hay coincidencias'})
            }
            
        } catch (error) {
            console.log('error filtrar curso por typeCourse', error)
        }
    }
    if (!title && !typeCourse && genreCourse) {
        try {
            const genreofCourse = await Courses.findAll({
                where: {
                genreCourse : {
                        [Op.iLike]: `%${genreCourse}%`
                    }
                },
                order: [['title', 'ASC']]
            });
            if(genreofCourse.length){
                res.status(200).json({
                curses : genreCourse,
                total: genreofCourse.length
            })
            } else {
                res.status(202).json({message: 'No hay coincidencias'})
            }
            
        } catch (error) {
            console.log('error filtrar curso por typeCourse', error)
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