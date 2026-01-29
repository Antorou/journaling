const Entry = require('../models/Entry');

const createEntry = async (entryData, userId) => {
  const existingEntry = await Entry.findOne({ 
    date: entryData.date,
    user: userId
  });
  
  if (existingEntry) {
    throw new Error('Une entrée existe déjà pour cette date.');
  }

  const newEntry = new Entry({ ...entryData, user: userId });
  return await newEntry.save();
};

const getAllEntries = async (filters = {}, userId) => {
  const query = { user: userId};

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

const updateEntry = async (id, updateData, userId) => {
  const entry = await Entry.findOneAndUpdate(
    { _id: id, user: userId }, 
    updateData, 
    { new: true, runValidators: true }
  );

  if (!entry) {
    throw new Error('Entrée introuvable');
  }

  return entry;
};

const deleteEntry = async (id, userId) => {
  const entry = await Entry.findOneAndDelete({ _id: id, user: userId });
  
  if (!entry) {
    throw new Error('Entrée introuvable');
  }

  return entry;
};

const getStats = async (userId) => {
  return await Entry.aggregate([
    {
      $match: { user: userId } 
    },
    {
      $group: {
        _id: null,
        totalDays: { $sum: 1 },
        avgSportDuration: { $avg: "$sport.duration" },
        totalSportMinutes: { $sum: "$sport.duration" },
        daysWithAlcohol: { 
          $sum: { $cond: [{ $eq: ["$alcohol", true] }, 1, 0] } 
        },
        daysGoodMood: {
          $sum: { $cond: [{ $eq: ["$mood.status", "good"] }, 1, 0] }
        },
        totalReadingMinutes: { $sum: "$reading.duration" }
      }
    },
    {
      $project: {
        _id: 0,
        totalDays: 1,
        totalSportMinutes: 1,
        totalReadingMinutes: 1,
        avgSportDuration: { $round: ["$avgSportDuration", 1] },
        alcoholFreeDays: { $subtract: ["$totalDays", "$daysWithAlcohol"] },
        goodMoodPercentage: { 
          $multiply: [{ $divide: ["$daysGoodMood", "$totalDays"] }, 100] 
        }
      }
    }
  ]);
};

module.exports = {
  createEntry,
  getAllEntries,
  updateEntry,
  deleteEntry,
  getStats
};