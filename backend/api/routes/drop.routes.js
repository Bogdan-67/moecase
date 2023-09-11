const Router = require('express');
const dropController = require('../controller/drop.controller');
const router = new Router();

router.get('/drop', dropController.getAllDrop);
router.get('/drop/:id', dropController.getOneDrop);

router.post('/drop', dropController.createDrop);

router.put('/drop', dropController.editDrop);

router.delete('/drop', dropController.deleteDrop);

module.exports = router;
