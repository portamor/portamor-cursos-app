const { Users, Courses } = require("../database.js");

const createUser = async (name, lastName, code, birthday, admin) => {
  const verificate = await userByCode(code);
  if (verificate.length) {
    code = code + "-P";
  }
  const newUser = await Users.create({
    name,
    lastName,
    birthday,
    code,
    admin
  });

  return newUser;
};

const userByNameLastNameBirthday = async (name, lastName, birthday) => {
  const userfound = await Users.findAll({
    where: {
      name: name,
      lastName: lastName,
      birthday: birthday,
    },
  });
  return userfound;
};

const getAllUsers = async () => {
  const allUsers = await Users.findAll();
  return allUsers;
};

const userByCode = async (code) => {
  const userCode = await Users.findAll({
    where: {
      code,
    },
    include: Courses,
  });
  return userCode;
};

const userById = async (id) => {
  const userId = await Users.findByPk(id, { include: Courses });
  return userId;
};

const getUsersByCourseId = async (id) => {
  const foundCoursefromDB = await Courses.findByPk(id, {
    include: { model: Users }
  });

  return foundCoursefromDB;
};

const updateUser = async ({ id, data }) => {
  const userUpdate = await userById(id);
  if (!userUpdate) {
    throw new Error("No hay usuario con esa id");
  }
  userUpdate.set(data);
  await userUpdate.save();
  return userUpdate;
};

const deleteUser = async (userId) => {
  const userDelete = await userById(userId)
  await userDelete.destroy()
  return 'User eliminado correctamene'
};

const restoreUser =async (userId) => {
  await Users.restore({
    where: {id: userId}
  });
  const userRestored = userById(userId)
  return userRestored
}

module.exports = {
  createUser,
  userByCode,
  userById,
  getUsersByCourseId,
  getAllUsers,
  updateUser,
  deleteUser,
  restoreUser,
  userByNameLastNameBirthday,
};
