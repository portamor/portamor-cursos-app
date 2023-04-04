const courseService     = require("../services/courseService.js");
const { getCourseById } = require("../services/courseService.js");
const userService       = require("../services/userService.js");

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
      const aUserCode = await userService.userByCode(code);
      if (!aUserCode.length)
        throw new Error(`No se encontro user con el code ${code}`);
      res.status(200).json({
        message: `El usuario con el codigo ${code} ha sido encontrado`,
        data: aUserCode,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  try {
    const allUsers = await userService.getAllUsers();
    if (allUsers) {
      res
        .status(200)
        .json({ message: `Usuarios encontrados con éxito`, data: allUsers });
    } else {
      res.status(201).json({ message: "No hay registro de usuarios" });
    }
  } catch (error) {
    res
      .status(200)
      .json({ mesagge: "error al obtener usuarios" + error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const userfound = await userService.userById(userId);
    if (!userfound.length)
      throw new Error(`No se encontro registro de ${userId} `);
    res.status(200).json({
      message: `Usuario con el is ${userId} se ha encontrado`,
      userAndCourse,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsersByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const foundCourse = await courseService.getCourseById(courseId)

    if(!foundCourse) {
      throw new Error(`No se ha encontrado ningun curso con este ID: ${courseId}`)
    }

    const { Users } = await userService.getUsersByCourseId(foundCourse.id)

    if(!Users.length) throw new Error("No se han encontrado opiniones de este curso");

    res.status(200).json({message: "Usuarios encontradas con exito", data: Users})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
};

const postUser = async (req, res) => {
  const { name, lastName, birthday } = req.body;
  try {
    let code = name.slice(0, 3) + lastName.slice(0, 3) + birthday.slice(0, 2);
    code = code.toUpperCase();
    const searchUser = await userService.userByNameLastNameBirthday(
      name,
      lastName,
      birthday
    );
    if (searchUser.length) {
      throw new Error("Ya existe un usuario con esos datos");
    }
    const userCode = await userService.userByCode(code);
    if (userCode.length) {
      code = code + "-P";
    }
    const createUser = await userService.createUser(
      name,
      lastName,
      code,
      birthday
    );
    res
      .status(200)
      .json({ message: `Usuario creado con éxito`, data: createUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postInscription = async (req, res) => {
  const { userId, courseId } = req.params;
  try {
    const userFound = await userService.userById(userId);
    if (userFound.length) {
      throw new Error(`No existe usuario con el id ${userId}`);
    }
    const courseFound = await getCourseById(courseId);
    if (courseFound.length) {
      throw new Error(`No existe curso con el id ${courseId}`);
    }
    const inscription = await userService.userInscription(userId, courseId);
    res.status(200).json({
      message: `El usuarion con id ${userId} se ha inscrito correctamente al curso con el id ${courseId}`,
      data: inscription,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const userPut = async (req, res) => {
  try {
    const { userId } = req.params;
    const foundUser = await userService.userById(userId);
    if (!foundUser) {
      throw new Error(`No se encontro el User con el id ${userId}`);
    }
    const updateAUser = await userService.updateUser({
      id: userId,
      data: req.body,
    });
    res.status(200).json({
      message: `El ususario con el id ${userId} ha sido actualizado correctamente`,
      data: updateAUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAuser = async (req, res) => {
  try {
    const { userId } = req.params;
    const foundUser = userService.userById(userId);
    if (!foundUser)
      throw new Error(`No se encontro el User con el id ${userId}`);
    const deleteUser = await userService.deleteUser(userId);
    res.status(200).json({ message: "User eliminado con éxito" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const restoreAUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const foundUser = await userService.userById(userId);
    if (!foundUser) {
      throw new Error(`No se encontro el User con el id ${userId}`);
    }
    if (foundUser.deletedAt === null) {
      throw new Error(`El usuario con el id ${userId} no habia sido eliminado`);
    }
    const restoreUser = await userService.restoreUser(userId);
    res
      .status(200)
      .json({ msg: "User restaurado con exito", data: restoreUser });
  } catch (error) {
    req.status(400).json({ message: error.message });
  }
};

module.exports = {
  postUser,
  getUsers,
  getUsersByCourseId,
  userPut,
  postInscription,
  getUserById,
  deleteAuser,
  restoreAUser,
};
