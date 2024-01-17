const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');

function usePassport() {
  passport.use(LocalStrategy);
}

module.exports = usePassport;
