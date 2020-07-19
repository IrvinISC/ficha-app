var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nivel_estudio_Schema = new Schema({
    nivel_estudio:{
        type: String,
        require: true},
    nom_escuela:{
        type: String,
        require: true
    },
    estado_escuela:{
        type: String,
        require: true
    },
    anio_inicio:{
        type: String,
        require: true
    },
    anio_term:{
        type: String,
        require: true
    },
    carrera:{
        type: String,
        require: true
    },
    usuario:{
        type: String,
        required: true
    }
},{
    timestamps: true
});
module.exports = mongoose.model('nivel_estudio',nivel_estudio_Schema);