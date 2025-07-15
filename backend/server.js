const express = require('express');
const session = require('express-session');
const passport = require('passport');
const CasStrategy = require('passport-cas2').Strategy;
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
//Test
// Enable CORS if frontend and backend are on different ports
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport user serialization
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Configure CAS strategy
passport.use(new CasStrategy({
  casURL: 'https://login.cs.vt.edu/cas'
}, (login, profile, done) => {
  return done(null, { username: login });
}));

// Trigger CAS login
app.get('/auth/cas', passport.authenticate('cas'));

// Callback from CAS
app.get('/auth/cas/callback',
  passport.authenticate('cas', { failureRedirect: '/login-failed' }),
  (req, res) => {
    // Redirect to frontend after successful login
    res.redirect(`${process.env.FRONTEND_URL}/dashboardstudent`);
  }
);

// Test: check login session
app.get('/api/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect(`${process.env.CAS_SERVER_URL}/logout`);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
