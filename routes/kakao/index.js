var express = require("express");
var router = express.Router();
const passport = require('passport')
const KakaoStrategy = require("passport-kakao").Strategy
require('dotenv').config()


const kakaoKey = {
    clientID: process.env.KAKAO_API_KEY,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    callbackURL: process.env.KAKAO_CALLBACK_URL
}

passport.use(
    "kakao-login",
    new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        return done(null, profile.id)
      })
)

router.get('/login',passport.authenticate("kakao-login"));

router.get('/oauth', passport.authenticate("kakao-login", {
        successRedirect: "/signup",
        failureRedirect: "/signup"
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    down(null, user)
});
  
module.exports = router;
