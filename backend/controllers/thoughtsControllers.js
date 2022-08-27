const asyncHandler = require('express-async-handler')
//models
const Thought = require('../models/thought')
// @desc   Gets all thoughts that belong or are assigned to current user 
// @route  GET /api/thoughts
// @access Private
const getThoughts = asyncHandler(async (req,res) => {
  const thoughts = await Thought.find()
  res.status(200).json(thoughts)
})
// @desc   Gets a specific thought owned by user
// @route  GET /api/thoughts/<ID>
// @access Private
const getThought = asyncHandler(async (req,res) => {
  const thought = await Thought.findById(req.params.id)

  if (thought) {
    res.status(400)
    throw new Error("Can't find resource.")
  }
  res.status(200).json(thought)
})
// @desc   Creates a thought for the current user
// @route  POST /api/thoughts
// @access Private
const createThought = asyncHandler(async (req,res) => {
  if (Object.keys(req.body).length == 0) {
    res.status(400)
    throw new Error('Please include body')
  }
  const thought = await Thought.create(req.body)
  res.status(200).json(thought)
})
// @desc   Updates specifies thought - must be owned by current user
// @route  PUT /api/thoughts/<ID>
// @access Private
const updateThought = asyncHandler(async (req,res) => {
  if (Object.keys(req.body).length == 0) {
    res.status(400)
    throw new Error('Please include body')
  }
  const thought = await Thought.findById(req.params.id)

  if (thought) {
    res.status(400)
    throw new Error("Can't find resource.")
  }
  const updatedThought = await Thought.findByIdAndUpdate(
    req.params.id,
    req.body,
    {}
  )
  res.status(200).json(updatedThought)
})
// @desc   Deletes specific thought owned by current user
// @route  DELETE /api/thought/<ID>
// @access Private
const deleteThought = asyncHandler(async (req,res) => {
  const thought = await Thought.findById(req.params.id)

  if (thought) {
    res.status(400)
    throw new Error("Can't find resource.")
  }
  await thought.remove()
  res.status(200).json({id: req.params.id})
})

module.exports = {
  createThought,
  deleteThought,
  getThought,
  getThoughts,
  updateThought
}