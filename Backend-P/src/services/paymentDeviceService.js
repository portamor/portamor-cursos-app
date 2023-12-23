const { PaymentDevice } = require("../database.js");

const getAllPaymentDevices = async () => {
  const allPaymentDevices = await PaymentDevice.findAll();
  return allPaymentDevices;
};

const getAPaymentDeviceById = async (id) => {
  const devicefound = await PaymentDevice.findByPk(id);
  return devicefound;
};

const updatePaymentDevice = async ({ id, data }) => {
  const devicefound = await getAPaymentDeviceById(id);
  if (!devicefound) {
    throw new Error("No hay dispositivo con ese id");
  }
  devicefound.set(data);
  await devicefound.save();
  return devicefound;
};

module.exports = {
  getAllPaymentDevices,
  getAPaymentDeviceById,
  updatePaymentDevice
};
