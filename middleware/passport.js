const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const JWT_SECRET = require("../config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    console.log("1");
    const user = await User.findOne({
      where: { username },
    });
    console.log("2");
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    console.log("3");
    if (passwordsMatch) {
      done(null, user);
    }
    console.log("4");
    done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      return done(null, false); // this will throw a 401
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      done(null, user); // if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
  }
);
