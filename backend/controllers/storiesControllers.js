const asyncHandler = require('express-async-handler')

// @desc   Gets all stories that belong or are assigned to current user 
// @route  GET /api/stories
// @access Private
const getStories = asyncHandler(async (req,res) => {
  res.status(200).json({message: 'Getting all stories'})
})
// @desc   Gets a specific story owned by user
// @route  GET /api/stories/<ID>
// @access Private
const getStory = asyncHandler(async (req,res) => {
  res.status(200).json({message: `Getting specific story: ${req.params.id}`})
})
// @desc   Creates a story for the current user
// @route  POST /api/stories
// @access Private
const createStory = asyncHandler(async (req,res) => {
  if (Object.keys(req.body).length == 0) {
    res.status(400)
    throw new Error('Please include body')
  }
  res.status(200).json({message: 'Creating story'})
})
// @desc   Updates specifies story - must be owned by current user
// @route  PUT /api/stories/<ID>
// @access Private
const updateStory = asyncHandler(async (req,res) => {
  if (Object.keys(req.body).length == 0) {
    res.status(400)
    throw new Error('Please include body')
  }
  res.status(200).json({message: `Updating story ${req.params.id}`})
})
// @desc   Deletes specific story owned by current user
// @route  DELETE /api/stories/<ID>
// @access Private
const deleteStory = asyncHandler(async (req,res) => {
  res.status(200).json({message: `Deleting story ${req.params.id}`})
})

module.exports = {
  createStory,
  deleteStory,
  getStories,
  getStory,
  updateStory
}