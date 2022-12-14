const 
  asyncHandler = require('express-async-handler'),
  jwt = require('jsonwebtoken'),
  User = require('../models/user')

// @desc   Creates a new user resource with given body
// @route  POST /api/users
// @access Public
const createUser = asyncHandler(async (req,res) => {
  const {username,email,dob} = req.body
  if (!(username && email && dob)) {
    res.status(400)
    throw new Error('All fields required')
  }
  const existingUser = await User.findOne({email})

  if (existingUser) {
    res.status(400)
    throw new Error('User with that email already exists')
  }
  const user = await User.create(req.body)

  if (!user) {
    res.status(400)
    throw new Error('User could not be created')
  }
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
// @access Private
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
// @desc   Logs in a registered user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req,res) => {
  const {username,email,dob} = req.body

  if (!(username && email && dob)) {
    res.status(400)
    throw new Error('All fields required')
  }
  const user = await User.findOne({username,email,dob})

  if (!user) {
    res.status(400)
    throw new Error('User does not exists exists')
  }
  
  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    dob: user.dob,
    token: _generateToken(user._id)
  })
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

//Authentication
const _generateToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn: '1d'
  })
}

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  updateUser
}