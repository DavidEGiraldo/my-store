const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy')

function usePassport() {
  passport.use(LocalStrategy);
  passport.use(JwtStrategy)
}

module.exports = usePassport;
