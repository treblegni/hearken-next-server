const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  dob: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  rating: {
    type: Number,
  },
  username: {
    type: String,
    required: true
  },
},
{
  timestamps: true
})

module.exports = mongoose.model('User',userSchema)