const 
  asyncHandler = require('express-async-handler'),
  User = require('../models/user')

// @desc   Creates a new user resource with given body
// @route  POST /api/users
// @access PRIVATE
const createUser = asyncHandler(async (req,res) => {
  if (Object.keys(req.body).length == 0) {
    res.status(400)
    throw new Error('Please include body')
  }
  const user = await User.create(req.body)
  res.status(200).json(user)
})
// @desc   Gets a specific user resource
// @route  GET /api/users/<ID>
// @access PRIVATE
const getUser = asyncHandler(async (req,res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error("Can't find resource.")
  }
  res.status(200).json(user)
})
// @desc   Gets all user resources
// @route  GET /api/users
// @access PRIVATE
const getUsers = asyncHandler(async (req,res) => {
  const users = await User.find()
  res.status(200).json(users)
})
// @desc   Deletes a specific user resource
// @route  DELETE /api/users/<ID>
// @access PRIVATE
const deleteUser = asyncHandler(async (req,res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error("Can't find resource.")
  }
  await user.remove()
  res.status(200).json({id: req.params.id})

})
// @desc   Updates a specific user resource
// @route  PUT /api/users/<ID>
// @access PRIVATE
const updateUser = asyncHandler(async (req,res) => {
  if (Object.keys(req.body).length == 0) {
    res.status(400)
    throw new Error('Please include body')
  }
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error("Can't find resource.")
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {}
  )
  res.status(200).json(updatedUser)
})

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser
}