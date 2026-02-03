const Entry = require('../models/Entry');
const mongoose = require('mongoose')

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
  const query = { user: userId };

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

// Helper function to calculate streaks
const calculateStreaks = async (userId) => {
  // Get all entries sorted by date descending (newest first)
  const entries = await Entry.find({ user: userId }).sort({ date: -1 });

  if (!entries.length) {
    return {
      alcoholFreeStreak: 0,
      meditationStreak: 0,
      sportStreak: 0
    };
  }

  let alcoholFreeStreak = 0;
  let meditationStreak = 0;
  let sportStreak = 0;

  // Calculate streaks from most recent entry backwards
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    // Check if current day breaks the streak or continues it
    // Alcohol-free streak: breaks if alcohol is true
    if (i === alcoholFreeStreak && !entry.alcohol) {
      alcoholFreeStreak++;
    }

    // Meditation streak: breaks if meditation is not active
    if (i === meditationStreak && entry.meditation.active) {
      meditationStreak++;
    }

    // Sport streak: breaks if sport is not active
    if (i === sportStreak && entry.sport.active) {
      sportStreak++;
    }
  }

  return {
    alcoholFreeStreak,
    meditationStreak,
    sportStreak
  };
};

const getStats = async (userId) => {
  const aggregateStats = await Entry.aggregate([
    {
      $match: { user: new mongoose.Types.ObjectId(userId) }
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
          $multiply: [
            { $divide: ["$daysGoodMood", { $cond: [{ $eq: ["$totalDays", 0] }, 1, "$totalDays"] }] },
            100
          ]
        }
      }
    }
  ]);

  // Calculate streaks
  const streaks = await calculateStreaks(userId);

  // Combine aggregate stats with streaks
  const stats = aggregateStats[0] || {};
  return {
    ...stats,
    ...streaks
  };
};

module.exports = {
  createEntry,
  getAllEntries,
  updateEntry,
  deleteEntry,
  getStats
};