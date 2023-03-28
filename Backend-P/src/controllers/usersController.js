const userService = require("../services/userService.js");

const getUsers = async (req, res) => {
    const {code} = req.query;
    if (code) {
        try {
            const aUserCode = await userService.userByCode(code)
            res.status(200).json(aUserCode)
        } catch (error) {
    res.status(404).json({message: error.message})
        }
    } else {
    try {
      const allUsers = await userService.getAllUsers();
      if (allUsers.length) {
        res.status(200).json(allUsers);
      } else {
        res.status(201).json({ message: "No hay registros" });
      }
    } catch (error) {
      res.status(200).json({ mesagge: "error al obtener usuarios" + error.message });
    }}
};

const postUser = async (req, res) => {
  const { name, lastName, birthday } = req.body;
  try {
    let code = name.slice(0, 3) + lastName.slice(0, 3) + birthday.slice(0, 2);
    code = code.toUpperCase();
    const createUser = await userService.createUser(
      name,
      lastName,
      code,
      birthday
    );
    res.status(200).json(createUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const userPut = async (req, res) => {
    try {
        const {id} = req.params;
        const updateAUser = await userService.updateUser({id, data: req.body})
        res.status(200).json(updateAUser)
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }

}

module.exports = {
  postUser,
  getUsers,
  userPut
};
