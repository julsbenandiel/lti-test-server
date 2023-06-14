const express = require('express');
const passport = require('passport');
const LtiStrategy = require('passport-lti').Strategy;

const app = express();

// Configure Passport with LTI strategy
passport.use(new LtiStrategy({
  consumerKey: 'YOUR_CONSUMER_KEY',
  consumerSecret: 'YOUR_CONSUMER_SECRET',
  passReqToCallback: true,
}, (req, lti, done) => {
  // Handle authentication and user validation
  // Extract relevant LTI data from `lti` object
  // and create/update user session

  return done(null, user);
}));

// Set up authentication route
app.post('/lti/login', passport.authenticate('lti', { session: false }), (req, res) => {

  console.log({ req })
  const access_token = ""

  // Successful authentication, generate access token and send response
  // const accessToken = generateAccessToken(req.user);
  res.json({ access_token: accessToken });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
