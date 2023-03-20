const {Users, Comments, Inscription}= require('../database.js')

const getUsers = async (req, res) => {
    const {code} = req.query
    
    if (!code) {
    try {
        const allUsers = await Users.findAll()

        if(allUsers.length) {
            res.status(200).json(allUsers)
        } else {
            res.status(201).json({message: 'No hay registros'})
        }
        
    } catch (error) {
        console.log('error al obtener usuarios', error)
    }
    }
}


const postUser = async (req, res) => {
    const { name, lastName, code, birthday, } = req.body;

    try {
        const bodyUser = {
            name, lastName, code, birthday
        }
    let createUser = await Users.create(bodyUser)

    res.status(200).json(createUser)


    } catch (error) {
        console.log(error)
        res.status(400).send('error al crear enuevo usuario')
    }
}


module.exports = {
    postUser,
    getUsers
}