var express = require("express");
var router = express.Router();
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
var db = require("../../db/firebase");
const {isLoggedIn} = require("../middleware")

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
    console.log('obj='+JSON.stringify(obj))
    let user = {
      userid: obj.email,
      nickname: obj.profile.nickname,
      thumbnail: obj.profile.thumbnail_image_url,
      member: false
    };

    db.checkUser(user.userid)
      .then(check => {
        if (check) {
          user.member = true
        }
        return done(null, user);
      })
      .catch(err => {
        return done(err);
      });
  })
);

router.get("/login", passport.authenticate("kakao-login"));

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect(301, '/')
});

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
  done(null, user);
});

module.exports = router;