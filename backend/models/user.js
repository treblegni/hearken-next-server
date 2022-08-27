const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  age: {
    type: Number,
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