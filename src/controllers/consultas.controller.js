const consultasController = {};

const datos_personales = require('../models/datos_personales');
const nivel_estudios = require('../models/nivel_estudios');
const datos_se = require('../models/datos_socioeconomicos');
const documentos = require('../models/documentos');

const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

consultasController.deleteFicha = async (req, res) => {
    //eliminar datos personales
    const datosP = await datos_personales.find({usuario: req.params.id});
    await datos_personales.findByIdAndDelete(datosP[0]._id);
    //eliminar datos de nivel de estudio
    const datosE = await nivel_estudios.find({usuario: req.params.id});
    await nivel_estudios.findByIdAndDelete(datosE[0]._id);
    //eliminar datos socioeconomicos
    const datosS = await datos_se.find({usuario: req.params.id});
    await datos_se.findByIdAndDelete(datosS[0]._id);
    //eliminar documentos
    const docs = await documentos.find({usuario: req.params.id});
    for(i = 0;i < docs.length;i++){
        await cloudinary.v2.uploader.destroy(docs[i].public_id, {
            invalidate: true,
            resource_types: "image"
        })
        .catch(err => console.log("Documento no encontrado"));
        await documentos.findByIdAndDelete(docs[i]._id);
    }
    res.redirect('/');
};

module.exports = consultasController;