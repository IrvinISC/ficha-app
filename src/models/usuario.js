const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const usuario_schema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    correo:{
        type: String,
        required: true,
        unique: true
    },
    contrasena:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

usuario_schema.methods.encryptPassword = async contrasena => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(contrasena, salt);
};

usuario_schema.methods.matchPassword = async function (contrasena) {
    return await bcrypt.compare(contrasena, this.contrasena);
};

module.exports = model('usuarios', usuario_schema);