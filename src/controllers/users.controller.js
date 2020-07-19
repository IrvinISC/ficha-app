const userCtrl = {};

const passport = require('passport');

const user = require('../models/usuario');

userCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

userCtrl.signUp = async (req, res) => {
    const errors = [];
    const {nombre, correo, contrasena, confirma_contrasena} = req.body;
    if(contrasena != confirma_contrasena){
        errors.push({text: 'La contraseña no coincide'});
    }
    if(contrasena.length < 4){
        errors.push({text: 'La contraseña debe tener minimo 4 caracteres'});
    }
    if(errors.length > 0){
        res.render('users/signup', {
            errors,
            nombre,
            correo
        });
    }else{
        const correoUser = await user.findOne({correo});
        if(correoUser){
            req.flash('error_msg', 'El correo ya esta en uso');
            res.redirect('/users/signup');
        }else{
            const newUser = new user({nombre, correo, contrasena});
            newUser.contrasena = await newUser.encryptPassword(contrasena);
            await newUser.save();
            req.flash('success_msg', 'Te has registrado correctamente');
            res.redirect('/users/signin');
        }
    }
};

userCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
};

userCtrl.signIn = passport.authenticate('local', {
     failureRedirect: '/users/signin',
     successRedirect: '/',
     failureFlash: true
});

userCtrl.logOut = (req, res) => {
    req.logOut();
    req.flash('success_msg', 'Cerraste sesion');
    res.redirect('/users/signin');
};

module.exports = userCtrl;