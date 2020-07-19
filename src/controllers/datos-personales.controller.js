const datosPersonalesController = {};

const datos_personales = require('../models/datos_personales');
const nivel_estudios = require('../models/nivel_estudios');

datosPersonalesController.renderDatosPersonalesForm = async (req, res) => {
    const datos = await datos_personales.find({
        usuario: req.user._id
    }).lean();
    if (datos.length > 0) {
        return res.redirect('/ficha/view-datos-personales');
    }
    res.render('ficha/datos_personales/datos-personales');
};

datosPersonalesController.createNewDatosPersonales = async (req, res) => {
    const unique = await datos_personales.find({
        usuario: req.user._id
    });
    if (unique.length == 0) {
        const {
            nombre,
            apellidos,
            fecha_nac,
            lugar_nac,
            estado_civil,
            sexo,
            domicilio,
            ciudad,
            estado,
            cod_postal,
            num_celular,
            correo,
            tel_casa,
            num_opc
        } = req.body;
        console.log(req.body);
        const newDatos = new datos_personales({
            nombre,
            apellidos,
            fecha_nac,
            lugar_nac,
            estado_civil,
            sexo,
            domicilio,
            ciudad,
            estado,
            cod_postal,
            num_celular,
            correo,
            tel_casa,
            num_opc
        });
        newDatos.usuario = req.user._id;
        await newDatos.save();
        req.flash('success_msg', 'Datos guardados exitosamente');
        const nivel_estudio = await nivel_estudios.find({usuario: req.user._id}).lean();
        if (nivel_estudio.length == 0) {
            res.redirect('/ficha/nivel-estudios');
        } else {
            res.redirect('/ficha/view-datos-personales');
        }
    } else {
        req.flash('success_msg', 'Datos guardados exitosamente');
        res.redirect('/ficha/view-datos-personales');
    }
};

datosPersonalesController.renderDatosPersonales = async (req, res) => {
    const datos = await datos_personales.find({
        usuario: req.user._id
    }).lean();
    if (datos.length == 0) {
        req.flash('warning_msg', 'Primero llena el formulario');
        return res.redirect('/ficha/datos-personales');
    }
    if (datos.length > 0) {
        var fecha = new Date();
        fecha = datos[0].fecha_nac;
        const dia = fecha.getUTCDate();
        const mesNum = fecha.getUTCMonth();
        const anio = fecha.getUTCFullYear();
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        var mes = {};
        for (i = 0; i < meses.length; i++) {
            if (mesNum == i) {
                mes = meses[i];
            }
        }
        const newFecha = dia + "-" + mes + "-" + anio;
        res.render('ficha/datos_personales/view-datos-personales', {
            datos,
            newFecha
        });
    } else {
        res.render('ficha/datos_personales/view-datos-personales', {
            datos
        });
    }
};

datosPersonalesController.renderDatosPersonalesEditForm = async (req, res) => {
    const datos = await datos_personales.findById(req.params.id).lean();
    if (datos.usuario != req.user._id) {
        req.flash('error_msg', 'No autorizado');
        return res.redirect('/ficha/view-datos-personales');
    }
    var fecha = new Date();
    fecha = datos.fecha_nac;
    const dia = fecha.getUTCDate();
    const mesNum = fecha.getUTCMonth();
    const anio = fecha.getUTCFullYear();
    if (mesNum < 9) {
        const fecha_nac = anio + "-0" + (mesNum + 1) + "-" + dia;
        res.render('ficha/datos_personales/edit-datos-personales', {
            datos,
            fecha_nac
        });
    } else {
        const fecha_nac = anio + "-" + (mesNum + 1) + "-" + dia;
        res.render('ficha/datos_personales/edit-datos-personales', {
            datos,
            fecha_nac
        });
    }
};

datosPersonalesController.updateDatosPersonales = async (req, res) => {
    const {
        nombre,
        apellidos,
        fecha_nac,
        lugar_nac,
        estado_civil,
        sexo,
        domicilio,
        ciudad,
        estado,
        cod_postal,
        num_celular,
        correo,
        tel_casa,
        num_opc
    } = req.body;
    await datos_personales.findByIdAndUpdate(req.params.id, {
        nombre,
        apellidos,
        fecha_nac,
        lugar_nac,
        estado_civil,
        sexo,
        domicilio,
        ciudad,
        estado,
        cod_postal,
        num_celular,
        correo,
        tel_casa,
        num_opc
    });
    req.flash('success_msg', 'Datos actualizados correctamente');
    res.redirect('/ficha/view-datos-personales');
};

datosPersonalesController.deleteDatosPersonales = async (req, res) => {
    await datos_personales.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Datos eliminados correctamente');
    res.redirect('/ficha/datos-personales');
};

datosPersonalesController.redirectDeleteFicha = (req, res) => {
    res.redirect('/ficha/delete/datos-personales');
};

module.exports = datosPersonalesController;