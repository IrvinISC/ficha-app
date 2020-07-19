const {
    Router
} = require('express');
const router = Router();

const {
    renderDocumentosForm,
    createNewDocumentos,
    renderDocumentos,
    renderDocumentosEditForm,
    updateDocumentos,
    deleteDocumentos
} = require('../controllers/documentos.controller');

const {isAuthenticated} = require('../helpers/auth');

//crear documentos
router.get('/ficha/documentos', isAuthenticated, renderDocumentosForm);
router.post('/ficha/new-documentos', isAuthenticated, createNewDocumentos);

//ver documentos
router.get('/ficha/view-documentos', isAuthenticated, renderDocumentos);

//editar documentos
router.get('/ficha/edit-documentos/:id', isAuthenticated, renderDocumentosEditForm);
router.put('/ficha/edit-documentos/:id', isAuthenticated, updateDocumentos);

//eliminar documentos
router.delete('/ficha/delete-documentos/:id', isAuthenticated, deleteDocumentos);

module.exports = router;