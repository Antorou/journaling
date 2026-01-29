const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');

router.post('/', entryController.createEntry);

router.get('/', entryController.getEntries);

module.exports = router;