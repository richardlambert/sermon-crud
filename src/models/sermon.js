const mongoose = require('mongoose');

const Sermon = mongoose.model(
  'Sermon',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    preacher: {
      type: String,
      required: true,
    },
    sermon: {
      type: String,
      required: true,
    },
  })
);

module.exports = Sermon;
