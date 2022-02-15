const actaCtrl = {};
const Acta  = require('../model/acta.model');

actaCtrl.getActas = async (req,res)=>{
    try {
        const actas  = await Acta.find({});
        return res.json(actas);
    } catch (error) {
        console.log(error)
        return res.send("Ha ocurrido un error en la operacion");
    }
}

actaCtrl.getActa = async (req,res)=>{
    try {
        const acta  = await Acta.findOne({idActa:req.params.idActa});
        if(acta == null || acta.length == 0){
            return res.send("No se encontro el acta buscada");
        }
        return res.json(acta); 
    } catch (error) {
        console.log(error)
        return res.send("Ha ocurrido un error en la operacion");
    }
}

actaCtrl.createActa = async (req,res)=>{
    try {
        const actTemp = {     
            nombreOrganizador: req.body.nombreOrganizador,
            idActa: req.body.idActa,
            fecha: req.body.fecha,
            hora: req.body.hora,
            participantes: req.body.participantes,
            agenda: req.body.agenda,
            notasReunion: req.body.notasReunion,
            puntosAccion: req.body.puntosAccion
        };

        const usuario = await Acta.findOne({idActa:actTemp.idActa});
        if(!usuario == null || !usuario.length == 0){
            return res.send("Ya existe una acta con este id");
        }

        let _acta  =  new Acta(actTemp);
        await _acta.save();
        return res.send("Acta añadida satisfactoriamente");
    } catch (error) {
        console.log(error)
        return res.send("Ha ocurrido un error en la operacion");
    }
}

actaCtrl.editActa = async (req,res)=>{
    try {
        const actTemp = {     
            nombreOrganizador: req.body.nombreOrganizador,
            idActa: req.body.idActa,
            fecha: req.body.fecha,
            hora: req.body.hora,
            participantes: req.body.participantes,
            agenda: req.body.agenda,
            notasReunion: req.body.notasReunion,
            puntosAccion: req.body.puntosAccion
        };

        const usuario = await Acta.findOne({idActa:req.params.idActa});
        if(usuario == null || usuario.length == 0){
            return res.send("No existe una acta con este id");
        }

        await Acta.updateOne({idActa:req.params.idActa}, actTemp);
        return res.send('Acta actualizada satisfactoriamente'); 
    } catch (error) {
        console.log(error)
        return res.send("Ha ocurrido un error en la operacion");
    }
}

actaCtrl.deleteActa = async (req,res)=>{
    try {
        await Acta.deleteOne({idActa:req.params.idActa});
        return res.send('Acta eliminada satisfactoriamente');
    } catch (error) {
        console.log(error)
        return res.send("Ha ocurrido un error en la operacion");
    }
}

module.exports = actaCtrl;