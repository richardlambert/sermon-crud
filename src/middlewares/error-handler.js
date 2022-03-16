const errorHandler = (err, req, res, next) => {
  const { message = 'Oops... Something went wrong', status = 500 } = err;
  return res.status(status).render('error', { message });
};

module.exports = errorHandler;
