const { response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
 
    // verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorizatin token required'})
    }

    // token looks something like 'Bearer lsdkfjasdl;f.sjdflaksdj.lasdfj'
    const token = authorization.split(' ')[1]
    console.log('token', token)
    try {
       const _id = jwt.verify(token, process.env.SECRET) 
       // attach user property to the req
       req.user = await User.findOne({ _id }).select('_id')
       next()
    } catch (error) {
        console.log('in catch',error)
        res.status(401).json({error: 'Request is not authorized'})
    }
    
}

module.exports = requireAuth