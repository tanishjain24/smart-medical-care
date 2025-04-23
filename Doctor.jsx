const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  uniqueId: { type: String, required: true, unique: true },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
