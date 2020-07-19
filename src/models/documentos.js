var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentos_Schema = new Schema({
    documentType:{
        type: String,
        required: true
    },
    documentURL:{
        type: String,
        require: true
    },
    public_id:{
        type: String,
        require: true
    },
    missing:{
        type: String,
        required: true
    },
    usuario:{
        type: String,
        required: true
    }
},{
    timestamps: true
});
module.exports = mongoose.model('documentos',documentos_Schema);