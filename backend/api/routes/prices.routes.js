const Router = require('express');
const pricesController = require('../controller/prices.controller');
const router = new Router();

router.get('/moex/index', pricesController.getMoexIndex);
router.post('/moex/prices', pricesController.getPrices);

module.exports = router;
