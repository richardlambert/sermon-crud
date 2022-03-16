const Sermon = require('../models/sermon');
const withAsyncCatch = require('../utilities/with-async-catch');
const ExpressError = require('../utilities/express-error');

const getSermonIndex = withAsyncCatch(async (req, res, next) => {
  const sermons = await Sermon.find({});
  return res.render('sermon/index', { sermons });
});

const getSermonDetail = withAsyncCatch(async (req, res, next) => {
  const { id } = req.params;
  const sermon = await Sermon.findById(id);
  if (!sermon) throw new ExpressError('Oops... Sermon not found', 404);
  return res.render('sermon/detail', { sermon });
});

const getSermonCreate = (req, res, next) => {
  return res.render('sermon/create');
};

const getSermonUpdate = withAsyncCatch(async (req, res, next) => {
  const { id } = req.params;
  const sermon = await Sermon.findById(id);
  return res.render('sermon/update', { sermon });
});

const createSermon = withAsyncCatch(async (req, res, next) => {
  const sermon = await Sermon.create(req.body);
  return res.redirect(`/sermons/${sermon._id}`);
});

const updateSermon = withAsyncCatch(async (req, res, next) => {
  const { id } = req.params;
  const sermon = await Sermon.findByIdAndUpdate(id, { ...req.body }, { runValidators: true });
  return res.redirect(`/sermons/${sermon._id}`);
});

const deleteSermon = withAsyncCatch(async (req, res, next) => {
  const { id } = req.params;
  const sermon = await Sermon.findByIdAndDelete(id);
  return res.redirect('/sermons');
});

module.exports = {
  getSermonIndex,
  getSermonDetail,
  getSermonCreate,
  getSermonUpdate,
  createSermon,
  updateSermon,
  deleteSermon,
};
