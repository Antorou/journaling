const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');
const { validateEntry } = require('../middlewares/validationMiddleware');

router.post('/', validateEntry, entryController.createEntry);

router.get('/', entryController.getEntries);

module.exports = router;