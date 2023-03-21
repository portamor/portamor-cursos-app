const {Courses} = require('../database.js')

const getCourses = async (req, res) => {
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
};

const postCourse = async (req, res)=> {

    const { title, image, typeCourse, goals, description, rating, materials, testimony, methodology } = req.body;

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
            methodology 
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