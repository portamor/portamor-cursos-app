const { Router }      = require('express');
const paymentDeviceRouter      = Router()
const paymentDeviceController = require('../controllers/paymentDeviceController.js')

paymentDeviceRouter.get('/', paymentDeviceController.getPaymentDevices);

paymentDeviceRouter.put('/', paymentDeviceController.putPaymentDevice)

module.exports = paymentDeviceRouter;