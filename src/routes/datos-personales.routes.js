const {
    Router
} = require('express');
const router = Router();

const {
    renderDatosPersonalesForm,
    createNewDatosPersonales,
    renderDatosPersonales,
    renderDatosPersonalesEditForm,
    updateDatosPersonales,
    deleteDatosPersonales
} = require('../controllers/datos-personales.controller');

const {isAuthenticated} = require('../helpers/auth');

//crear datos personales
router.get('/ficha/datos-personales', isAuthenticated, renderDatosPersonalesForm);
router.post('/ficha/new-datos-personales', isAuthenticated, createNewDatosPersonales);

//ver datos personales
router.get('/ficha/view-datos-personales', isAuthenticated, renderDatosPersonales);

//editar datos personales
router.get('/ficha/edit-datos-personales/:id', isAuthenticated, renderDatosPersonalesEditForm);
router.put('/ficha/edit-datos-personales/:id', isAuthenticated, updateDatosPersonales);

//eliminar datos personales
router.delete('/ficha/delete-datos-personales/:id', isAuthenticated, deleteDatosPersonales);

module.exports = router;