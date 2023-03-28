const { Users, Inscription } = require("../database.js");

const createUser = async (name, lastName, code, birthday) => {
  let repit = "cambio de codigo";
  const verificate = await userByCode(code);
  if (verificate.length) {
    code = code + "-P";
  }
  const newUser = await Users.create({
    name,
    lastName,
    birthday,
    code,
  });
  return newUser;
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
    include: { model: Inscription },
  });
  return userCode;
};

const userById = async (id) => {
  const userId = await Users.findByPk(id);
  return userId;
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

module.exports = {
  createUser,
  userByCode,
  userById,
  getAllUsers,
  updateUser,
};
