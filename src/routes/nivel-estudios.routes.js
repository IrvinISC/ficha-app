const {Router} = require('express');
const router = Router();

const {
    renderNivelEstudiosForm,
    createNewNivelEstudios,
    renderNivelEstudios,
    renderNivelEstudiosEditForm,
    updateNivelEstudios,
    deleteNivelEstudios
} = require('../controllers/nivel-estudios.controller');

const {isAuthenticated} = require('../helpers/auth');

//crear nivel de estudios
router.get('/ficha/nivel-estudios', isAuthenticated, renderNivelEstudiosForm);
router.post('/ficha/new-nivel-estudios', isAuthenticated, createNewNivelEstudios);

//ver nivel de estudios
router.get('/ficha/view-nivel-estudios', isAuthenticated, renderNivelEstudios);

//editar nivel de estudios
router.get('/ficha/edit-nivel-estudios/:id', isAuthenticated, renderNivelEstudiosEditForm);
router.put('/ficha/edit-nivel-estudios/:id', isAuthenticated, updateNivelEstudios);

//eliminar nivel de estudios
router.delete('/ficha/delete-nivel-estudios/:id', isAuthenticated, deleteNivelEstudios);

module.exports = router;