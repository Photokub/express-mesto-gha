const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const user = require('./users');

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array,
    default: [],
    required: false,
  },
  createdAt: {
    type: Date, default: Date.now,
    required: false,
  }
})

module.exports = mongoose.model('card', cardSchema)