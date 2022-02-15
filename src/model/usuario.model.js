const mongoose = require('mongoose');
const {Schema} = require('mongoose');

let usuarioSchema = new Schema ({
    cedula: {type:String , required:true},
    nombre: {type:String , required:true},
    apellido: {type:String , required:true},
    telefono: {type:String, required: true},
    direccion: {type:String, required: true},
    cargo : {type:String, required:true}
});

const User  = mongoose.model('Usuario', usuarioSchema);

module.exports = User; 