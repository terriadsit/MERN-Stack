// a function for each route to call

const mongoose = require('mongoose')
const Workout = require('../models/workoutModel')


// GET all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// Create a new workout
async function createWorkout (req, res) {
    const {title, load, reps} = req.body

    // add doc to db
    try {
        const workout = await Workout.create({ title, load, reps })// Create returns response=workout = the new document along with id     
        res.status(200).json(workout)
    } catch(error) {
        console.log('error', error.message)
        res.status(400).json({error: error.message})
    }
}

// Get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    // check if id is a mongoose type id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findById(id) // return to stop from following code

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    // check if id is a mongoose type id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findOneAndDelete({_id: id}) 

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


// Upate a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    // check if id is a mongoose type id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })
        

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}