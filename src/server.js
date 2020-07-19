const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Initializations
const storage = multer.diskStorage({
    fileFilter: (req, file, next) => {
        const filterTypes = /jpg|jpeg|png|gif|pdf/;
        const filetype = filterTypes.test(file.mimetype);
        const extname = filterTypes.test(path.extname(file.originalname));
        if (filetype && extname) {
            return next(null, true);
        } else {
            next('error: tipo de archivo no soportado');
        }
    }
});
const app = express();
require('./config/passport');

// Settings
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: {
        if_equal: function (a, b, opts) {
            if (a == b) {
                return opts.fn(this);
            } else {
                return opts.inverse(this);
            }
        },
        if_min: function (a, b, opts) {
            if(a < b) {
                return opts.fn(this);
            } else {
                return opts.inverse(this);
            }
        },
        if_max: function (a, b, opts) {
            if(a > b) {
                return opts.fn(this);
            } else {
                return opts.inverse(this);
            }
        }
    }
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(multer({
    storage,
    limits: {
        fileSize: 1000000
    }
}).any('documento1',
    'documento2',
    'documento3',
    'documento4',
    'documento5',
    'documento6',
    'documento7',
    'documento8',
    'documento9'));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.warning_msg = req.flash('warning_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/datos-personales.routes'));
app.use(require('./routes/nivel-estudios.routes'));
app.use(require('./routes/datos-se.routes'));
app.use(require('./routes/documentos.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/consultas.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;