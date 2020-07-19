var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var datos_personales_Schema = new Schema({
    nombre:{
        type: String,
        require: true},
    apellidos:{
        type: String,
        require: true
    },
    fecha_nac:{
        type: Date,
        require: true
    },
    lugar_nac:{
        type: String,
        require: true
    },
    estado_civil:{
        type: String,
        require: true
    },
    sexo:{
        type: String,
        require: true
    },
    domicilio:{
        type: String,
        require: true
    },
    ciudad:{
        type: String,
        require: true
    },
    estado:{
        type: String,
        require: true
    },
    cod_postal:{
        type: String,
        require: true
    },
    num_celular:{
        type: String,
        require: true
    },
    correo:{
        type: String,
        require: true
    },
    tel_casa:{
        type: String,
        require: true
    },
    num_opc:{
        type: String
    },
    usuario:{
        type: String,
        required: true
    }
},{
    timestamps: true
});
module.exports = mongoose.model('datos_personales',datos_personales_Schema);