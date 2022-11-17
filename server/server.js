require('dotenv').config()
const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout.js')
const userRoutes = require('./routes/user.js')

// express app
const app = express()
app.use(cors({
    origin: 'http://localhost:3000'
}));

// middleware
app.use(express.json()) // for req json, parses and attaches any data to req object

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next() // invoke next or will never go on to next middleware
})

//routes///
app.use('/api/workouts', workoutRoutes)  // makes workoutRoutes relative to /api/workouts
app.use('/api/users', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
// listen for requests 
    app.listen(process.env.PORT, () => {
    console.log('Connected to db and listening on port ', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

