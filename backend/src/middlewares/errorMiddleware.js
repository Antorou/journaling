const errorHandler = (err, req, res, next) => {
  // log l'erreur pour le dev
  console.error(`[Error] ${err.stack}`);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || "Erreur Serveur Interne",
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;