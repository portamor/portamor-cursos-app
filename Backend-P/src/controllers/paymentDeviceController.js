const paymentDeviceService       = require("../services/paymentDeviceService.js");

const getPaymentDevices = async (req, res) => {
  try {
    const paymentDevices = await paymentDeviceService.getAllPaymentDevices();
    const detailedDevices = [];
    for (const e of paymentDevices) {
      detailedDevices.push(e.dataValues);
    }

    if (!detailedDevices.length) throw new Error(`No se encontraron dispositivos de pago`);
    
    res.status(200).json({
      message: `Dispositivos encontrados con exito`,
      data: detailedDevices
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const putPaymentDevice = async (req, res) => {
  try {
    const { id, deviceToken } = req.body;
    const devicefound = await paymentDeviceService.getAPaymentDeviceById(id);
    if (!devicefound) {
      throw new Error(`Dispositivo con token ${deviceToken} no encontrado`);
    }
    const updatedDevice = await paymentDeviceService.updatePaymentDevice({
      id: devicefound.id,
      data: req.body
    });

    res.status(200).json({
      message: `Token del dispositivo actualizado correctamente`,
      data: [updatedDevice.dataValues]
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPaymentDevices,
  putPaymentDevice,
};
