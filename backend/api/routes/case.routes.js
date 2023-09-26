const Router = require('express');
const caseController = require('../controller/case.controller');
const router = new Router();

router.get('/cases', caseController.getAllCases);
router.get('/case/:id', caseController.getCaseById);
router.get('/case-groups', caseController.getCaseGroups);

router.post('/case', caseController.createCase);
router.post('/case-group', caseController.createCaseGroup);
router.post('/open-case', caseController.openCase);

router.put('/case/:id', caseController.editCase);
router.put('/case-group/:id', caseController.editCaseGroup);

router.delete('/case/:id', caseController.deleteCase);
router.delete('/case-group/:id', caseController.deleteCaseGroup);

module.exports = router;
