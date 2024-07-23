require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var applicationsRouter = require("./routes/applications");

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected To MongoDB..");
  })
  .catch((err) => {
    console.log("Couldn't Connect to MongoDB..");
    process.exit(1);
  });

var app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ieeehsb.software"],
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/applications", applicationsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
