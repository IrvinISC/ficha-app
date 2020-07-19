const datosSeController = {};

const datos_se = require('../models/datos_socioeconomicos');
const documentos = require('../models/documentos');

datosSeController.renderDatosSeForm = async (req, res) => {
    const datos = await datos_se.find({
        usuario: req.user._id
    });
    if (datos.length > 0) {
        return res.redirect('/ficha/view-datos-se');
    }
    res.render('ficha/datos_se/datos-se');
};

datosSeController.createNewDatosSe = async (req, res) => {
    const unique = await datos_se.find({
        usuario: req.user._id
    });
    if (unique.length == 0) {
        const {
            grp_ind,
            discapacidad,
            prospera
        } = req.body;
        const newDatos = new datos_se({
            grp_ind,
            discapacidad,
            prospera
        });
        newDatos.usuario = req.user._id;
        await newDatos.save();
        req.flash('success_msg', 'Datos guardados exitosamente');
        const datos = await documentos.find({usuario: req.user._id}).lean();
        if (datos.length == 0) {
            res.redirect('/ficha/documentos');
        } else {
            res.redirect('/ficha/view-datos-se');
        }
    }else{
        req.flash('success_msg', 'Datos guardados exitosamente');
        res.redirect('/ficha/view-datos-se');
    }
};

datosSeController.renderDatosSe = async (req, res) => {
    const datos = await datos_se.find({
        usuario: req.user._id
    }).lean();
    if (datos.length == 0) {
        req.flash('warning_msg', 'Primero llena el formulario');
        return res.redirect('/ficha/datos-se');
    }
    res.render('ficha/datos_se/view-datos-se', {
        datos
    });
};

datosSeController.renderDatosSeEditForm = async (req, res) => {
    const datos = await datos_se.findById(req.params.id).lean();
    if (datos.usuario != req.user._id) {
        req.flash('error_msg', 'No autorizado');
    }
    res.render('ficha/datos_se/edit-datos-se', {
        datos
    });
};

datosSeController.updateDatosSe = async (req, res) => {
    const {
        grp_ind,
        discapacidad,
        prospera
    } = req.body;
    await datos_se.findByIdAndUpdate(req.params.id, {
        grp_ind,
        discapacidad,
        prospera
    });
    req.flash('success_msg', 'Datos actualizados correctamente');
    res.redirect('/ficha/view-datos-se');
};

datosSeController.deleteDatosSe = async (req, res) => {
    await datos_se.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Datos eliminados correctamente');
    res.redirect('/ficha/datos-se');
};

module.exports = datosSeController;