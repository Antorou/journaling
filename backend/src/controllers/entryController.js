const asyncHandler = require('../middlewares/asyncHandler');
const entryService = require('../services/entryService');

const createEntry = asyncHandler(async (req, res) => {
  const savedEntry = await entryService.createEntry(req.body);
  
  res.status(201).json({
    success: true,
    data: savedEntry
  });
});

const getEntries = asyncHandler(async (req, res) => {
  const entries = await entryService.getAllEntries();
  res.status(200).json({
    success: true,
    count: entries.length,
    data: entries
  });
});

module.exports = { createEntry, getEntries };