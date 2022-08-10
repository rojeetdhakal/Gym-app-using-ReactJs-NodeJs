require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes=require('./routes/user')
let cors = require("cors");
//express app
const app = express();
//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes

app.use(cors()); //inside cors(corsOptions)
app.use(express.json());
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request request
    app.listen(process.env.PORT, () => {
      console.log(
        `  database is connected and server is running in  the port http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
