const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function (username, password, done) {
        db.get('SELECT email FROM user WHERE email = ?', username, function(err, row) {
            if (!row) {
                return done(null, false, {message: 'Incorrect email or password.'});
            }
                
            db.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, password, function(err, row) {
                if (!row) return done(null, false);
                return done(null, row);
            });
        });
    }
));