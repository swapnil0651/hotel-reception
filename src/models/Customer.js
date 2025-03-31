const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  checkInDate: {
    type: Date,
    default: Date.now
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  idType: {
    type: String,
    required: true
  },
  idNumber: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Customer', CustomerSchema);