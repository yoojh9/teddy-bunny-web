var express = require("express");
var passport = require("passport");
var router = express.Router();
var db = require("../../db/firebase");

router.get("/", function(req, res, next) {
  let user = req.user
  if(!user.member){
    res.render("signup", { user: user });
  } else {
    console.log("session::"+req.session.passport.user)
    res.render("index", {user: req.session.passport.user})
  }
});

router.post("/", function(req, res, next){
  let data = req.body
  let add = db.addUser(data.email, data.nickname, data.thumbnail, data.phone)
  
  add.then(result => {
    req.session.passport.user.member = true
    res.render("index", {user: req.session.passport.user})
  }).catch(err => {
    res.render("error", {message: err})
  })
  
})
module.exports = router;
