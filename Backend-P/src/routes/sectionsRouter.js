const {Router} = require('express')
const sectionRouter = Router()
const sectionController = require('../controllers/sectionsController')


//--- GET
sectionRouter.get('/:sectionId', sectionController.getASectionById)
sectionRouter.get('/course/:courseId', sectionController.getSectionsByIdCourse)

// --- POST
sectionRouter.post('/', sectionController.postSection)

// --- PUT
sectionRouter.put('/', sectionController.putSection)
sectionRouter.put('/restore', sectionController.restoreSection)

//--- DELETE
sectionRouter.delete('/:sectionId', sectionController.deleteASection)

module.exports = sectionRouter;