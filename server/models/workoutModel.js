const mongoose = require('mongoose')

const Schema = mongoose.Schema

// define structure of a particular document
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })

// apply schema to a particular model, use the model to interact with a collection of that name
module.exports = mongoose.model('Workout', workoutSchema)  //singular, it will pluralize it to make the collection
