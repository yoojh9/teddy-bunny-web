var express = require("express");
var router = express.Router();
const passport = require('passport')
const KakaoStrategy = require("passport-kakao").Strategy
require('dotenv').config()


const kakaoKey = {
    clientID: "adc6abd46af38b7d5b090bc8e3c5b4a9",
    clientSecret: "sHA0d9l1xwPMUKjgXwtv60mBM6wCNlh4",
    callbackURL: "http://localhost:3000/kakao/oauth"
}

passport.use(
    "kakao-login",
    new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
        console.log(profile)
      })
)

router.get('/login',passport.authenticate("kakao-login"));

router.get(
    "/oauth",
    passport.authenticate("kakao-login", {
        successRedirect: "/",
        failureRedirect: "/error"
    })
);



module.exports = router;
