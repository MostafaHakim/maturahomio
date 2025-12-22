const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  medicalName: String,
  doctorName: String,
});

module.exports = doctorSchema;
