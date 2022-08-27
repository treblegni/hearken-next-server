const mongoose = require('mongoose')

const thoughtSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  }
},{
  timestamps:true
})

module.exports = mongoose.model('Thought',thoughtSchema)