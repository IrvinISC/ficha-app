const nivelEstudiosController = {};

const nivel_estudios = require('../models/nivel_estudios');
const datos_se = require('../models/datos_socioeconomicos');

nivelEstudiosController.renderNivelEstudiosForm = async (req, res) => {
    const datos = await nivel_estudios.find({
        usuario: req.user._id
    }).lean();
    if (datos.length > 0) {
        return res.redirect('/ficha/view-nivel-estudios');
    }
    res.render('ficha/nivel_estudios/nivel-estudios');
};

nivelEstudiosController.createNewNivelEstudios = async (req, res) => {
    const unique = await nivel_estudios.find({
        usuario: req.user._id
    });
    if (unique.length == 0) {
        const {
            nivel_estudio,
            nom_escuela,
            estado_escuela,
            anio_inicio,
            anio_term,
            carrera
        } = req.body;
        const newDatos = new nivel_estudios({
            nivel_estudio,
            nom_escuela,
            estado_escuela,
            anio_inicio,
            anio_term,
            carrera
        });
        newDatos.usuario = req.user._id;
        await newDatos.save();
        req.flash('success_msg', 'Datos guardados exitosamente');
        const datos = await datos_se.find({usuario: req.user._id}).lean();
        if (datos.length == 0) {
            res.redirect('/ficha/datos-se');
        } else {
            res.redirect('/ficha/view-nivel-estudios');
        }
    } else {
        req.flash('success_msg', 'Datos guardados exitosamente');
        res.redirect('/ficha/view-nivel-estudios');
    }
};

nivelEstudiosController.renderNivelEstudios = async (req, res) => {
    const datos = await nivel_estudios.find({
        usuario: req.user._id
    }).lean();
    if (datos.length == 0) {
        req.flash('warning_msg', 'Primero llena el formulario');
        return res.redirect('/ficha/nivel-estudios');
    }
    res.render('ficha/nivel_estudios/view-nivel-estudios', {
        datos
    });
};

nivelEstudiosController.renderNivelEstudiosEditForm = async (req, res) => {
    const datos = await nivel_estudios.findById(req.params.id).lean();
    if (datos.usuario != req.user._id) {
        req.flash('error_msg', 'No autorizado');
        return res.redirect('/ficha/view-datos-personales');
    }
    res.render('ficha/nivel_estudios/edit-nivel-estudios', {
        datos
    });
};

nivelEstudiosController.updateNivelEstudios = async (req, res) => {
    const {
        nivel_estudio,
        nom_escuela,
        estado_escuela,
        anio_inicio,
        anio_term,
        carrera
    } = req.body;
    await nivel_estudios.findByIdAndUpdate(req.params.id, {
        nivel_estudio,
        nom_escuela,
        estado_escuela,
        anio_inicio,
        anio_term,
        carrera
    });
    req.flash('success_msg', 'Datos actualizados correctamente');
    res.redirect('/ficha/view-nivel-estudios');
};

nivelEstudiosController.deleteNivelEstudios = async (req, res) => {
    await nivel_estudios.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Datos eliminados correctamente');
    res.redirect('/ficha/nivel-estudios');
};

module.exports = nivelEstudiosController;