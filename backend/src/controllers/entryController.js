const asyncHandler = require('../middlewares/asyncHandler');
const entryService = require('../services/entryService');

const createEntry = asyncHandler(async (req, res) => {
  const savedEntry = await entryService.createEntry(req.body, req.user.id);

  res.status(201).json({
    success: true,
    data: savedEntry
  });
});

const getEntries = asyncHandler(async (req, res) => {
  const entries = await entryService.getAllEntries(req.query, req.user.id);

  res.status(200).json({
    success: true,
    count: entries.length,
    data: entries
  });
});

const updateEntry = asyncHandler(async (req, res) => {
  const updatedEntry = await entryService.updateEntry(
    req.params.id,
    req.body,
    req.user.id
  );

  res.status(200).json({
    success: true,
    data: updatedEntry
  });
});

const deleteEntry = asyncHandler(async (req, res) => {
  await entryService.deleteEntry(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    message: "Entrée supprimée avec succès"
  });
});

const getStats = asyncHandler(async (req, res) => {
  const stats = await entryService.getStats(req.user.id);

  res.status(200).json({
    success: true,
    data: stats.totalDays ? stats : { totalDays: 0, message: "Aucune donnée" }
  });
});

module.exports = {
  createEntry,
  getEntries,
  getStats,
  updateEntry,
  deleteEntry
};