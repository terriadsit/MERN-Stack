// a function for each route to call

const mongoose = require('mongoose')
const User = require('../models/userModel')

// signup a user
const signupUser = async (req, res) => {
    res.json({mssg: 'a user has signed up'})
}

// login a user
const loginUser = async (req, res) => {
    res.json({mssg: 'a user has logged in'})
}



// update a user
const updateUser = async (req, res) => {
    res.json({mssg: 'a user has signed up'})
}

module.exports = {
    signupUser,
    loginUser,
    updateUser
}