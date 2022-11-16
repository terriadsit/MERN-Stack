const express = require('express')

const Workout = require('../models/workoutModel')
const router = express.Router()

// GET all workouts
router.get('/', (req, res) => {
    res.json({mssg: 'GET all workouts'})
})

// GET a single workout
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single workout'})
})

// POST a new workout
router.post('/', async (req, res) => {
    const {title, load, reps} = req.body

    try {
        const workout = await Workout.create({ title, load, reps })// Create returns response=workout = the new document along with id     
        res.status(200).json(workout)
    } catch(error) {
        console.log('error', error.message)
        res.status(400).json({error: error.message})
    }
})

// DELETE a new workout
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE a new workout'})
})


// UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({msg: 'UPDATE a new workout'})
})

module.exports = router