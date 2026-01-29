const entryService = require('../services/entryService');

const createEntry = async (req, res) => {
  try {
    // on passe le body de la requête au service
    const savedEntry = await entryService.createEntry(req.body);
    
    res.status(201).json({
      success: true,
      data: savedEntry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getEntries = async (req, res) => {
  try {
    const entries = await entryService.getAllEntries();
    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des entrées"
    });
  }
};

module.exports = {
  createEntry,
  getEntries
};