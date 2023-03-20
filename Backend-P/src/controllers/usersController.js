const {Users}= require('../database.js')

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
    } else if (code) {
        try {
            const userCurrent = await Users.findOne({where: { code }})
            if(userCurrent) {
                res.status(200).json(userCurrent)
            } else {
                res.status(202).json({message: 'No se encontro usuario con ese codigo'})
            }
            
        } catch (error) {
            console.log('error al obtener el user por code' ,error)
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