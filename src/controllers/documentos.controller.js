require('dotenv').config();
const documentosController = {};

const documentos = require('../models/documentos');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

documentosController.renderDocumentosForm = async (req, res) => {
    const datos = await documentos.find({
        usuario: req.user._id
    }).lean();
    if (datos.length > 0) {
        return res.redirect('/ficha/view-documentos');
    }
    res.render('ficha/documentos/documentos');
};

documentosController.createNewDocumentos = async (req, res) => {
    const unique = await documentos.find({
        usuario: req.user._id
    });
    var doc = req.files;
    if (unique.length == 0 && (doc.length >= 8 && doc.length <= 9)) {
        for (i = 0; i < doc.length; i++) {
            const result = await cloudinary.v2.uploader.upload(doc[i].path);
            const newDoc = new documentos({
                documentType: doc[i].fieldname,
                documentURL: result.url,
                public_id: result.public_id,
                missing: "no"
            });
            newDoc.usuario = req.user._id;
            await newDoc.save();
        }
        if (doc.length < 9) {
            const types = ["documento1", "documento2", "documento3", "documento4",
                "documento5", "documento6", "documento7", "documento8", "documento9"
            ];
            var types2 = types;
            for (i = 0; i < types.length; i++) {
                for (j = 0; j < doc.length; j++) {
                    if (types[i] == doc[j].fieldname) {
                        types2.splice(i, 1);
                    } else {}
                }
            }
            for (i = 0; i < types2.length; i++) {
                const newDoc = new documentos({
                    documentType: types2[i],
                    documentURL: "",
                    public_id: "",
                    missing: "si"
                });
                newDoc.usuario = req.user._id;
                await newDoc.save();
            }
        }
        req.flash('success_msg', 'Ficha creada exitosamente');
        res.redirect('/ficha/view-datos-personales');
    }else{
        res.redirect('/ficha/view-documentos');
    }
};

documentosController.renderDocumentos = async (req, res) => {
    const datos = await documentos.find({
        usuario: req.user._id
    }).lean();
    const eliminados = await documentos.find({
        usuario: req.user._id,
        missing: "si"
    }).lean();
    if (eliminados.length == 9) {
        for (i = 0; i < eliminados.length; i++) {
            await documentos.findByIdAndDelete(eliminados[i]._id);
        }
        req.flash('warning_msg', 'Vuelve a subir tu documentacion');
        return res.redirect('/ficha/documentos');
    }
    if (datos.length == 0) {
        req.flash('warning_msg', 'Primero llena el formulario');
        return res.redirect('/ficha/documentos');
    }
    const count = await documentos.countDocuments({
        missing: "si",
        usuario: req.user._id
    });
    res.render('ficha/documentos/view-documentos', {
        datos,
        count
    });
};

documentosController.renderDocumentosEditForm = async (req, res) => {
    const datos = await documentos.findById(req.params.id).lean();
    if (datos.usuario != req.user._id) {
        req.flash('error_msg', 'No autorizado');
        return res.redirect('/ficha/view-datos-personales');
    }
    res.render('ficha/documentos/edit-documentos', {
        datos
    });
};

documentosController.updateDocumentos = async (req, res) => {
    var doc = req.files;
    const documento = await documentos.findById(req.params.id).lean();
    await cloudinary.v2.uploader.destroy(documento.public_id, {
            invalidate: true,
            resource_types: "image"
        })
        .catch(err => console.log("Documento no encontrado"));
    const result = await cloudinary.v2.uploader.upload(doc[0].path);
    await documentos.findByIdAndUpdate(req.params.id, {
        documentType: documento.documentType,
        documentURL: result.url,
        public_id: result.public_id,
        missing: "no"
    });
    req.flash('success_msg', 'Documento actualizado correctamente');
    res.redirect('/ficha/view-documentos');
};

documentosController.deleteDocumentos = async (req, res) => {
    const documento = await documentos.findById({
        _id: req.params.id
    }).lean();
    const result = await cloudinary.v2.uploader.destroy(documento.public_id, {
        invalidate: true,
        resource_types: "image"
    });
    await documentos.findByIdAndUpdate(req.params.id, {
        documentURL: "",
        public_id: "",
        missing: "si"
    });
    const datos = await documentos.find({
        usuario: req.user._id
    }).lean();
    req.flash('success_msg', 'Documento eliminado correctamente');
    if (datos.length == 0) {
        res.redirect('/ficha/documentos');
    } else {
        res.redirect('/ficha/view-documentos');
    }
};

module.exports = documentosController;