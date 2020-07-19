var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var datos_socioeconomicos_Schema = new Schema({
    grp_ind:{
        type: String,
        require: true},
    discapacidad:{
        type: String,
        require: true
    },
    prospera:{
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
module.exports = mongoose.model('datos_socioeconomicos',datos_socioeconomicos_Schema);