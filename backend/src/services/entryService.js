const Entry = require('../models/Entry');

const createEntry = async (entryData) => {
  const existingEntry = await Entry.findOne({ date: entryData.date });
  
  if (existingEntry) {
    throw new Error('Une entrée existe déjà pour cette date.');
  }

  const newEntry = new Entry(entryData);
  return await newEntry.save();
};

const getAllEntries = async (filters = {}) => {
  const query = {};

  if (filters.startDate || filters.endDate) {
    query.date = {};
    if (filters.startDate) query.date.$gte = new Date(filters.startDate);
    if (filters.endDate) query.date.$lte = new Date(filters.endDate);
  }

  if (filters.mood) query['mood.status'] = filters.mood;

  if (filters.sport !== undefined) {
    query['sport.active'] = filters.sport === 'true';
  }

  if (filters.alcohol !== undefined) {
    query.alcohol = filters.alcohol === 'true';
  }

  if (filters.reading !== undefined) query['reading.active'] = filters.reading === 'true';
  if (filters.meditation !== undefined) query['meditation.active'] = filters.meditation === 'true';

  return await Entry.find(query).sort({ date: -1 });
};
module.exports = {
  createEntry,
  getAllEntries
};