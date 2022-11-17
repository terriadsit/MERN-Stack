// this file is for routes for workouts

const express = require('express')

// controller functions
const { 
    signupUser,
    loginUser,
    updateUser
} = require('../controllers/userController')


const router = express.Router()

// login route
router.post('/login', loginUser)  // sending data so a post request

// signup route
router.post('/signup', signupUser)


// UPDATE a user
router.patch('/:id', updateUser)

module.exports = router