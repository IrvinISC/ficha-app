const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/usuario');

passport.use(new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contrasena'
}, async (correo, contrasena, done) => {
    //confirmar si existe el correo del usuario
    const user = await User.findOne({correo});
    if(!user){
        return done(null, false, {message: 'No existe el usuario'});
    }else{
        //validar la contrasena
        const match = await user.matchPassword(contrasena);
        if(match){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Contraseña incorrecta'});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    }).lean();
});