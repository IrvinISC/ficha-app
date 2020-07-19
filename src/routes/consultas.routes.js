const {Router} = require('express');
const router = Router();

const {deleteFicha} = require('../controllers/consultas.controller');

const {isAuthenticated} = require('../helpers/auth');

//eliminar toda la ficha
router.delete('/delete/ficha/:id', isAuthenticated, deleteFicha);

module.exports = router;