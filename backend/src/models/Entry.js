const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  // on utilise la date comme identifiant naturel, formatée à minuit pour éviter les doublons
  date: {
    type: Date,
    required: [true, "La date est obligatoire"],
    unique: true,
    default: () => new Date().setHours(0, 0, 0, 0) 
  },
  
  mood: {
    status: {
      type: String,
      enum: {
        values: ['good', 'ok', 'bad'],
        message: '{VALUE} n\'est pas un mood valide'
      },
      required: true
    },
    description: { 
      type: String, 
      trim: true,
      maxlength: [500, "La description ne peut pas dépasser 500 caractères"]
    }
  },

  sport: {
    active: { type: Boolean, default: false },
    activityType: { type: String, trim: true },
    duration: { 
      type: Number, 
      min: [0, "La durée ne peut pas être négative"],
      default: 0 
    }
  },

  alcohol: {
    type: Boolean,
    default: false
  },

  reading: {
    active: { type: Boolean, default: false },
    bookTitle: { type: String, trim: true },
    duration: { type: Number, min: 0, default: 0 }
  },

  meditation: {
    active: { type: Boolean, default: false },
    duration: { type: Number, min: 0, default: 0 }
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

// indexer la date pour des recherches ultra-rapides
entrySchema.index({ date: -1 });

module.exports = mongoose.model('Entry', entrySchema);