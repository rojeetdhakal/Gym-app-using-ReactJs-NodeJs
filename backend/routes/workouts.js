const express = require("express");
const {
  createWorkout,
  getWorkout,
  getworkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth=require('../middleware/requireAuth')
const router = express.Router();
//require auth for all  workout routes
router.use(requireAuth)

//middleware
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

//Get all workouts
router.get("/", getworkouts);

//Get a single workouts
router.get("/:id", getWorkout);

//Post a new workouts
router.post("/", createWorkout);

//Delete a workout
router.delete("/:id", deleteWorkout);

//Update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
