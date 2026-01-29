const Joi = require('joi');

const entrySchema = Joi.object({
  date: Joi.date().iso().messages({
    'date.format': "Le format de la date doit être ISO (YYYY-MM-DD)"
  }),
  mood: Joi.object({
    status: Joi.string().valid('good', 'ok', 'bad').required(),
    description: Joi.string().max(500).allow('', null)
  }).required(),
  sport: Joi.object({
    active: Joi.boolean(),
    activityType: Joi.string().allow('', null),
    duration: Joi.number().min(0).max(1440) // pas plus de 24h/jour
  }),
  alcohol: Joi.boolean(),
  reading: Joi.object({
    active: Joi.boolean(),
    bookTitle: Joi.string().allow('', null),
    duration: Joi.number().min(0)
  }),
  meditation: Joi.object({
    active: Joi.boolean(),
    duration: Joi.number().min(0)
  })
});

const validateEntry = (req, res, next) => {
  const { error } = entrySchema.validate(req.body, { abortEarly: false }); // abortEarly: false = voir toutes les erreurs d'un coup
  
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Le corps de la requête ne peut pas être vide."
    });
  }
  
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({
      success: false,
      errors: errorMessages
    });
  }
  
  next();
};

module.exports = { validateEntry };