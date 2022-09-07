const
  jwt = require('jsonwebtoken'),
  User = require('../models/user'),
  asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req,res,next) => {
  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    res.status(401)
    throw new Error('Not Authorized: no token')
  }

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {    
      // verifying token from request
      const decoded = jwt.verify(token,process.env.JWT_SECRET)

      //get user using id from token
      req.user = await User.findById(decoded.id)
      next()
    }
    catch(error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }
})

module.exports = {
  protect
}