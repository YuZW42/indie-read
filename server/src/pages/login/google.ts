import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import passport from 'passport';
import express from 'express';
import session from 'express-session';
import prisma from '../shared/prismaclient'

const router = express.Router();
const CLIENT_URL = 'http://localhost:5173/';


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile: Profile, cb) => {
  console.log('Logging in...');
 
  const user: any = {
    googleId: profile.id,
    username: profile.displayName,
    name: profile.name
  };
  console.log();
  // Storing the user in a database should be done here, call to the prisma
  //file and see if it exist --> if not, then we should use the create function

  const existingUser = await prisma.user.findFirst({
    where: { email:profile.id} 
  });

  if (existingUser) {
    console.log('User already exists:', existingUser);
    return cb(null, existingUser);
  } else {
 
    const newUser = await prisma.user.create({
      data: {
        
        name: profile.displayName || 'Unknown',
        email: profile.id || 'no-email@example.com',
       
        isCreator: false,
        preference: {},
        role: 'BASIC'
        
      }
    });

    console.log('New user created:', newUser);
    return cb(null, newUser);
  }
  //return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

router.use(session({
  secret: 'indie', 
  resave: false,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/login/success', (req, res) => {
  console.log('Request received at /login/success');
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successful',
      user: req.user,
      cookies: req.cookies
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure'
  });
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.redirect(CLIENT_URL);
  });
});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: CLIENT_URL,
  failureRedirect: '/auth/login/failed'
}));

export default router;