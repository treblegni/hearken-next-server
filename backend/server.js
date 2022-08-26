const 
  express = require('express'),
  dotenv = require('dotenv').config(),
  port = process.env.PORT || 3030,
  storiesRoutes = require('./routes/stories'),
  {errorHandler} = require('./middleware/errorMiddleware')

const app = express()

//middleware
app.use(express.json())// allows for json body
app.use(express.urlencoded({extended: false}))// encodes urls for security

//routes
app.use('/api/stories',storiesRoutes)

//error handler
app.use(errorHandler)

app.listen(port,() => {
  console.log(`Stared server on port ${port}...`)
})