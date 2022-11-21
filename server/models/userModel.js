const mongoose = require('mongoose')
const bcrypt = require('bcrypt') // hashes passwords before storing them
const validator = require('validator') // validates emails and passwords

const Schema = mongoose.Schema

// define structure of a particular document
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true  // don't allow duplicate emails in db
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true })

// static signup method, later can call signup method on the userModel
// an additional static method besides those provided by mongoose
userSchema.statics.signup = async function(email, password) { // don't use an arrow function with this key word
    // validation
    password = password + '' // validator requires strings
    email = email + ''
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough, minimum: length 8, 1 lowercase, 1 uppercase, 1 number,  1 symbol')
    }

    // is email alredy used?
    const exists = await this.findOne({ email })  // don't have a User yet. this refers to the model
    if (exists) {
        throw Error('email already in use')  // later when using .signup, catch error and set response
    }

    // bycrypt requires a random string of characters to be added to user password prior to hashing, a salt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash }) // create a new document

    return user    
}

// static login method
userSchema.statics.login = async function(email, password) { // don't use an arrow function with this key word
    // validation
    password = password + '' // validator requires strings
    email = email + ''
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    // is email already used?
    const user = await this.findOne({ email })  // don't have a User yet. this refers to the model
    
    if (!user) {
        throw Error('Incorrect email')  // later when using .signup, catch error and set response
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) { 
        throw Error('Incorrect password')
    }

    return user    
}

// apply schema to a particular model, use the model to interact with a collection of that name
module.exports = mongoose.model('User', userSchema)  //singular, it will pluralize it to make the collection
