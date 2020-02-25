var express = require("express");
var passport = require("passport");
var router = express.Router();
var db = require("../../db/firebase");

const doAsync = fn => async (req, res, next) =>
  await fn(req, res, next).catch(next);

router.get("/", function(req, res, next) {
  let user = req.session.passport.user;
  if (!user.member) {
    res.render("signup", { user: user });
  }
  res.render("index");
});

module.exports = router;
