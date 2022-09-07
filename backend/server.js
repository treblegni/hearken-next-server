const 
  express = require('express'),
  dotenv = require('dotenv').config(),
  connectDB = require('./config/db'),
  port = process.env.PORT || 3030

const
  thoughtsRoutes = require('./routes/thoughts'),
  usersRoutes = require('./routes/users'),
  {errorHandler} = require('./middleware/errorMiddleware')

connectDB()
const app = express()

//middleware
app.use(express.json())// allows for json body
app.use(express.urlencoded({extended: false}))// encodes urls for security

//routes
app.use('/api/thoughts',thoughtsRoutes)
app.use('/api/users',usersRoutes)

//error handler
app.use(errorHandler)

app.listen(port,() => {
  console.log(`Stared server on port ${port}...`)
})