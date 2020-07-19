const {
    Router
} = require('express');
const router = Router();

const {
    renderDatosSeForm,
    createNewDatosSe,
    renderDatosSe,
    renderDatosSeEditForm,
    updateDatosSe,
    deleteDatosSe
} = require('../controllers/datos-se.controller');

const {isAuthenticated} = require('../helpers/auth');

//crear datos socioeconomicos
router.get('/ficha/datos-se', isAuthenticated, renderDatosSeForm);
router.post('/ficha/new-datos-se', isAuthenticated, createNewDatosSe);

//ver datos socioeconomicos
router.get('/ficha/view-datos-se', isAuthenticated, renderDatosSe);

//editar datos socioeconomicos
router.get('/ficha/edit-datos-se/:id', isAuthenticated, renderDatosSeEditForm);
router.put('/ficha/edit-datos-se/:id', isAuthenticated, updateDatosSe);

//eliminar datos socioeconomicos
router.delete('/ficha/delete-datos-se/:id', isAuthenticated, deleteDatosSe);

module.exports = router;