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
  const entries = await entryService.getAllEntries(req.query);

  res.status(200).json({
    success: true,
    count: entries.length,
    data: entries
  });
});

const getStats = asyncHandler(async (req, res) => {
  const stats = await entryService.getStats();
  
  res.status(200).json({
    success: true,
    data: stats[0] || { message: "Aucune donnée pour le moment" }
  });
});

module.exports = { createEntry, getEntries, getStats };