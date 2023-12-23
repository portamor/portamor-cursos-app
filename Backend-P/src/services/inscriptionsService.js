const { CourseInscription } = require("../database.js");

const userInscription = async (userId, courseId, isPaymentCourse, telephone, holderPaymentMethod) => {
  const inscrited = await CourseInscription.create({
    UserId: userId,
    CourseId: courseId,
    enrolmentStatus: isPaymentCourse ? 'pendiente' : 'matriculado',
    telephone: telephone,
    holderPaymentMethod: holderPaymentMethod,
  });
  return inscrited;
};

const pendingInscriptions = async () => {
  const inscriptions = await CourseInscription.findAll({
    where: {
      enrolmentStatus: 'pendiente',
    },
    order: [
        ['createdAt', 'DESC'],
    ],
  });
  return inscriptions;
};

const updatePendingInscription = async (userId, courseId, telephone) => {
  const inscripcion = await CourseInscription.findOne({
    where: {
      UserId: userId,
      CourseId: courseId,
      telephone,
    }
  });

  inscripcion.enrolmentStatus = 'matriculado';
  inscripcion.save();

  return inscripcion;
};

module.exports = {
  userInscription,
  pendingInscriptions,
  updatePendingInscription
};
