var express = require("express");
var router = express.Router();
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
var db = require("../../db/firebase");
require("dotenv").config();

const kakaoKey = {
  clientID: process.env.KAKAO_API_KEY,
  clientSecret: process.env.KAKAO_CLIENT_SECRET,
  callbackURL: process.env.KAKAO_CALLBACK_URL
};

passport.use(
  "kakao-login",
  new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
    let obj = profile._json.kakao_account;
    let user = {
      userid: obj.email,
      nickname: obj.profile.nickname,
      member: false
    };

    let check = db.checkUser(user.userid);

    check
      .then(check => {
        if (check) {
          user.member = true;
          return done(null, user);
        } else {
          return done(null, user);
        }
      })
      .catch(err => {
        return done(err);
      });
  })
);

router.get("/login", passport.authenticate("kakao-login"));

router.get(
  "/oauth",
  passport.authenticate("kakao-login", {
    successRedirect: "/signup",
    failureRedirect: "/error",
    failureFlash: true
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  down(null, user);
});

module.exports = router;
