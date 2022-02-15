const mongoose = require('mongoose');
const {Schema} = require('mongoose');

let actaSchema = new Schema({
    nombreOrganizador: {type:String, required:true},
    idActa: {type:String, required:true},
    fecha: {type:String, required:true},
    hora: {type:String, required:true},
    participantes: {type:Array, required:true},
    agenda: {type:String, required:true},
    notasReunion: {type:String, required:true},
    puntosAccion: {type:Array, required:true}
});

const Acta = mongoose.model('Acta', actaSchema);

module.exports = Acta;