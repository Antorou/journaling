const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');
const { validateEntry } = require('../middlewares/validationMiddleware');

router.get('/stats', entryController.getStats);

router.post('/', validateEntry, entryController.createEntry);

router.get('/', entryController.getEntries);

router.put('/:id', validateEntry, entryController.updateEntry);

router.delete('/:id', entryController.deleteEntry);

module.exports = router;