const mongoose = require('mongoose')

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
userSchema.statics.signup = async (email, password) => {
    const exists = await this.findOne({ email })  // don't have a User yet. this refers to the model
    if (exists) {
        throw Error('email already in use')  // later when using .signup, catch error and set response
    }


}

// apply schema to a particular model, use the model to interact with a collection of that name
module.exports = mongoose.model('User', userSchema)  //singular, it will pluralize it to make the collection
