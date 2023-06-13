require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const activityRouter = require("./api/activity/activity.router");
const transportationRouter = require("./api/transportation/transportation.router");

app.use(express.json());

// app.use("/api/users", userRouter);
app.use("/api/activity", activityRouter)
app.use("/api/transportation", transportationRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});