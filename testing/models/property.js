// models/property.js

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  Veg_nonveg: String,
  location: String,
  budget: String,
  size: String,
});

module.exports = mongoose.model('Property', propertySchema);
