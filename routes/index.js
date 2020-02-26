var express = require("express");
var router = express.Router();
var path = require('path')
var kakaoRoute = require('./kakao/index')
var signupRoute = require('./signup/index')

router.get("/", function(req, res, next) {
  res.render("index");
});

router.get("/terms", function(req, res, next) {
  res.render("terms")
})

router.get("/privacy", function(req, res, next) {
  res.render("privacy")
})

router.use("/kakao", kakaoRoute);
router.use("/signup", signupRoute);

module.exports = router;
