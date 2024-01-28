const { getCourseById } = require("../services/courseService.js");
const { userById }       = require("../services/userService.js");
const { getAllPaymentDevices } = require("../services/paymentDeviceService.js");
const inscriptionsService = require("../services/inscriptionsService.js")

// FOR NOTIFICATIONS
const admin = require("firebase-admin");

const initFirabase = () => {
  const serviceAccount = require(`../keys/${process.env.FIREBASE_ADMINSDK}`);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};

initFirabase();

// INSCRIPTIONS ROUTES
const postInscription = async (req, res) => {
  const { userId, courseId } = req.params;
  const { telephone, holderPaymentMethod } = req.body;
  try {
    const userFound = await userById(userId);
    if (userFound.length) {
      throw new Error(`No existe usuario con el id ${userId}`);
    }
    const courseFound = await getCourseById(courseId);
    if (courseFound.length) {
      throw new Error(`No existe curso con el id ${courseId}`);
    }
    const inscription = await inscriptionsService.userInscription(userId, courseId, courseFound.isPaymentCourse, telephone, holderPaymentMethod);

    let responseMessage = `${userFound.name} ${userFound.lastName} se ha inscrito al curso ${courseFound.title}`;
    if (inscription.dataValues.enrolmentStatus === 'pendiente') {
      responseMessage = `Su incripción al curso ${courseFound.title} ha iniciado. \n Se le notificará la activación luego de la verificación.`;
      sendPendingNotification(`${userFound.name} ${userFound.lastName} requiere activación de su inscripción`);
    }
    
    res.status(200).json({
      message: responseMessage,
      data: inscription,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const sendPendingNotification = async (notificationMessage) => {
  const firstDeviceToken = await getAllPaymentDevices();
  const deviceToken = firstDeviceToken[0] ? firstDeviceToken[0].dataValues.deviceToken : 'withoutdevicetocken';
  const message = {
    token: deviceToken,
    notification: {
      title: "INSCRIPCIÓN PENDIENTE",
      body: notificationMessage,
    }
  };

  admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully send message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  })
};

const getPendingInscriptions = async (req, res) => {
    const inscriptions = await inscriptionsService.pendingInscriptions();

    const detailedIncriptions = [];
    for (const e of inscriptions) {
      const course = await getCourseById(e.dataValues.CourseId);
      detailedIncriptions.push({ ...e.dataValues, title: course.title });
    }

    res.status(200).json({
      message: `Inscripciones Pendientes recuperadas`,
      data: detailedIncriptions,
    });
};

const putPendingInscription = async (req, res) => {
  try {
    const { UserId, CourseId, telephone, holderPaymentMethod, title } = req.body;
    const inscription = await inscriptionsService.updatePendingInscription(UserId, CourseId, telephone);

    if (!inscription) {
      throw new Error(`No se encontró la inscripción del usuario ${holderPaymentMethod} en el curso ${title}`);
    }
    res.status(200).json({
      message: `${holderPaymentMethod} esta MATRICULADO en el curso ${title}`
    });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
}

module.exports = {
  postInscription,
  getPendingInscriptions,
  putPendingInscription,
  sendPendingNotification
};
