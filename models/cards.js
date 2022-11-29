const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const User = require('./users');

const cardSchema = new mongoose.Schema({
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
    User,
    type: mongoose.ObjectId,
    required: false,
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