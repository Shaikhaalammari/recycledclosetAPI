const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User, Vendor } = require("../db/models");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    console.log("1");
    const user = await User.findOne({
      where: { username },
    });
    const vendor = await Vendor.findOne({ where: { userId: user.id } });
    console.log("2");
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    console.log("3");
    if (passwordsMatch) {
      return done(null, user);
    }
    console.log("4");
    return done(null, false);
  } catch (error) {
    return done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  { jwtFromRequest: fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      return done(null, false);
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      done(null, user); // if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
  }
);
