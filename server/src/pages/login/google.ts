import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import passport from 'passport';
import express from "express";


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID ,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile: Profile, cb) => {
    console.log("loggin")
    const user: any = {
      googleId: profile.id,
      username: profile.displayName,
      name:profile.name
      
    };
    console.log(user)
    //user.serializeUser();
    //storing the user in a database

    return cb(null, user);
  }
));



passport.serializeUser(function(profile, cb) {
  process.nextTick(function() {
    cb(null, profile);
  });
});
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

const router = express.Router();
const CLIENT_URL = "http://localhost:5173/"
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google",passport.authenticate("google",{scope:["profile"]}));
router.get("/google/callback", (req, res, next) => {
  
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login"
  })(req, res, next);
});




export default router;