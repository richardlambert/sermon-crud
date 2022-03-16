const express = require('express');
const sermonsController = require('../controllers/sermons-controller');

const router = new express.Router();

router.get('/', sermonsController.getSermonIndex);

router.get('/create', sermonsController.getSermonCreate);

router.get('/:id', sermonsController.getSermonDetail);

router.get('/:id/update', sermonsController.getSermonUpdate);

router.post('/', sermonsController.createSermon);

router.patch('/:id', sermonsController.updateSermon);

router.delete('/:id', sermonsController.deleteSermon);

module.exports = router;
