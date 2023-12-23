const { Router }      = require('express');
const inscriptionsRouter      = Router()
const inscriptionsController = require('../controllers/inscriptionsController.js')

inscriptionsRouter.get('/pendingInscriptions', inscriptionsController.getPendingInscriptions);

inscriptionsRouter.post('/:userId/:courseId', inscriptionsController.postInscription)

inscriptionsRouter.put('/updateInscription', inscriptionsController.putPendingInscription);

module.exports = inscriptionsRouter;