// a function for each route to call

const mongoose = require('mongoose')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)
        
        res.status(200).json({ email, token })
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// signup a user
const signupUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.signup(email, password)  // returns new document created in Mongodb
        
        // create a token
        const token = createToken(user._id)
        res.status(200).json({ email, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

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