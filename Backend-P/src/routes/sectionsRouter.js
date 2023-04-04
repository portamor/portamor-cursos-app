const {Router}          = require('express')
const sectionController = require('../controllers/sectionsController')
const sectionRouter     = Router()

// --- POST
sectionRouter.post('/:courseId', sectionController.postSection);
//--- GET
sectionRouter.get('/',                  sectionController.getAllSections)
sectionRouter.get('/:sectionId',       sectionController.getASectionById);
sectionRouter.get('/course/:courseId', sectionController.getSectionsByCourseId);
// --- PUT
sectionRouter.put('/:sectionId',         sectionController.putSection);
sectionRouter.put('/restore/:sectionId', sectionController.restoreSection);
//--- DELETE
sectionRouter.delete('/:sectionId', sectionController.deleteASection);

module.exports = sectionRouter;