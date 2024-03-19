const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const Staff = require('../models/staff');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_secret_key'
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    console.log("Jwt", JSON.stringify(jwtPayload.email))
  try {
    const user = await Staff.findOne(jwtPayload);
    console.log("User found", user)
    if (!user) {
      return done(null, false);
    }
    console.log("Passed")
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;