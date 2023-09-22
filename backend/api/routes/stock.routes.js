const Router = require('express');
const stockController = require('../controller/stock.controller');
const router = new Router();

router.get('/stocks', stockController.getAllStocks);
router.get('/stock/:id', stockController.getOneStock);

router.post('/stock', stockController.createStock);

router.put('/stock', stockController.editStock);

router.delete('/stock', stockController.deleteStock);

module.exports = router;
