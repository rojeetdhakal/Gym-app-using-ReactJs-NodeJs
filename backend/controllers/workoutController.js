const Workout = require("../models/workoutmodels");
const mongoose = require("mongoose");
//get all the workouts
const getworkouts = async (req, res) => {
  const user_id=req.user._id
  const workouts = await Workout.find({user_id}).sort({ createdAt: -1 });
  res.status(200).json(workouts)
  // console.log(workouts);
};

//get a single workouts
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {       //search for invalid id check using mongoose
    return res.status(404).json({ error: "No such Workouts" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
  console.log(workout)
};

//create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  let emptyFields=[];
  if(!title){
    emptyFields.push('title')
  }
  if(!load){
    emptyFields.push('load')
  }
  if(!reps){
    emptyFields.push('reps')
  }
  if(emptyFields.length>0){
    return res.status(400).json({error:"please fill the  all fields.",emptyFields})
  }
  //add docs to db
  console.log(req.body,'req')
  try {
    const user_id=req.user._id
    const workout = await Workout.create({ title, load, reps,user_id });
    res.status(200).json(workout);
    console.log(workout)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//delete a workouts
const deleteWorkout=async(req,res)=>{
  const {id}=req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error:"No Such workouts"})
  }
  const workout= await  Workout.findByIdAndDelete({_id:id})
  if(!workout){
    return res.status(400).json({error:"No such workouts"})
  }
  res.status(200).json(workout)
}
//update  workout
const updateWorkout=async(req,res)=>{
  const{id}=req.params 
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error:"no such id"})
  }
  const workout=await Workout.findByIdAndUpdate({_id:id},{
    ...req.body
  })
  if(!workout){
    return res.status(400).json({error:"No such workouts"})
  }
  res.status(200).json(workout)
}



module.exports = {
  getworkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
};
