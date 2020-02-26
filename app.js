const express = require("express");
const session = require("express-session");
const httpError = require("http-errors");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const router = require("./routes/index");
const passport = require("passport");
const flash = require('connect-flash')
const app = express();

const PORT = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("tiny"));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(session({secret: "teddybunny",resave: false,saveUninitialized: true}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(httpError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, function() {
  console.log("Example skill server listening on port " + PORT);
});

module.exports = app;
