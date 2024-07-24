require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminsRouter = require("./routes/admins");
var applicationsRouter = require("./routes/applications");
var committeesRouter = require("./routes/committees");
var chaptersRouter = require("./routes/chapters");

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
const sessionConfig = {
  secret: "MYSECRET",
  name: "IEEE-HSB",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "lax",
    secure: true,
  },
};
app.set("trust proxy", 1);
app.use(session(sessionConfig));
app.use(
  cors({
    origin: [
      "https://ieeehsb.software",
      "http://localhost:3000",
      "http://127.0.0.1:5500",
    ],
    credentials: true,
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
app.use("/admins", adminsRouter);
app.use("/applications", applicationsRouter);
app.use("/committees", committeesRouter);
app.use("/chapters", chaptersRouter);

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
