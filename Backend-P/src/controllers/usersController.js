const { getCourseById } = require("../services/courseService.js");
const userService       = require("../services/userService.js");

// USER ROUTES
const getUsers = async (req, res) => {
  try {
    const { code } = req.query;

    if(code) {
      const aUserCode = await userService.userByCode(code);

      if (!aUserCode.length) throw new Error(`No se encontro user con el code ${code}`);
      
      return res.status(200).json({ message: `Usuario encontrado con exito`, data: aUserCode, });
    } 
    
    const allUsers = await userService.getAllUsers();

    if (!allUsers.length) throw new Error(`No se encontro user con el code ${code}`);
    
    res.status(200).json({ message: `Usuarios encontrados con exito`, data: allUsers });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const userfound = await userService.userById(userId);
    if (!userfound) {
      throw new Error(`No se encontro registro de ${userId}`);
    }    
    res.status(200).json({
      message: `Usuario con el id ${userId} se ha encontrado`,
      userfound,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsersByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const foundCourse = await getCourseById(courseId)

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

const getCoursesOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const foundUser = await userService.userById(userId);

    if(!foundUser) throw new Error(`No se ha encontrado ningun usuario con el ID: ${userId}`)

    const { Courses } = foundUser;

    if(!Courses.length) return res.status(200).json({ message: "No se ha encontrado ningun curso al que esté inscripto", data: [] }) 

    res.status(200).json({ message: "Cursos encontrados con exito", data: Courses })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const postUser = async (req, res) => {
  const { name, lastName, birthday, admin } = req.body;

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
      birthday,
      admin
    );

    res
      .status(200)
      .json({ message: `Usuario creado con éxito`, data: createUser });
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
  getCoursesOfUser,
  userPut,
  getUserById,
  deleteAuser,
  restoreAUser
};
