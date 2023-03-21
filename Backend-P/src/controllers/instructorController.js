const {Instructor} = require('../database.js')

const getInstructor = async(req, res) =>{

    try {

        const allInstructor = await Instructor.findAll()

        if(allInstructor.length){
            res.status(200).json(allInstructor)
        } else {
            res.status(202).json({message: 'No hay instructores'})
        }
        
    } catch (error) {

        console.log('error al crear Instructor', error)

    }

}

const postInstructor = async (req, res) => {
    
    const {instructorName, instructorScore, instructorReview, instructorDescription } = req.body;

    try {
        let bodyInstructor = {
            instructorName, instructorScore, instructorReview, instructorDescription
        }
        const createInstructor = await Instructor.create(bodyInstructor)

        res.status(200).json(createInstructor)
        
    } catch (error) {
        console.log('error al crear instructor', error)
    }

}

module.exports = {
    getInstructor,
    postInstructor
}