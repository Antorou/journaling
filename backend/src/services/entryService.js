const Entry = require('../models/Entry');

const createEntry = async (entryData) => {
  const existingEntry = await Entry.findOne({ date: entryData.date });
  
  if (existingEntry) {
    throw new Error('Une entrée existe déjà pour cette date.');
  }

  const newEntry = new Entry(entryData);
  return await newEntry.save();
};

const getAllEntries = async () => {
  return await Entry.find().sort({ date: -1 }); // tri décroissant
};

module.exports = {
  createEntry,
  getAllEntries
};