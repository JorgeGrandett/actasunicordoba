const usuarioaCtrl = {};
const Usuario = require('../model/usuario.model');

usuarioaCtrl.getUsuarios = async (req,res)=>{ 
    try {
        const usuarios = await Usuario.find({});
        return res.json(usuarios);
    } catch (error) {
        console.log(error);
        return res.send("Ha ocurrido un error en la operacion");
    }
};

usuarioaCtrl.getUsuario = async (req,res)=>{ 
    try {
        const usuario = await Usuario.findOne({cedula:req.params.cedula});
        if(usuario == null || usuario.length == 0){
            return res.send("No se encontro en la DB");
        }
        return res.json(usuario);
    } catch (error) {
        console.log(error);
        return res.send("Ha ocurrido un error en la operacion");
    }
};

usuarioaCtrl.createUsuario = async (req,res)=>{ 
    try {
        const userTemp = {
            cedula: req.body.cedula,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            cargo: req.body.cargo
        };

        const usuario = await Usuario.findOne({cedula:userTemp.cedula});
        if(!usuario == null || !usuario.length == 0){
            return res.send("Ya se encuetran registrado un usuario con esta cedula");
        }

        let _usuario = new Usuario(userTemp);
        await _usuario.save();
        return res.send("Usuario creado con exito")
    } catch (error) {
        console.log(error);
        return res.send("Ha ocurrido un error en la operacion");
    }
};

usuarioaCtrl.editUsuario = async (req,res)=>{ 
    try {
        const userTemp = {
            cedula: req.body.cedula,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            direcciones: req.body.direcciones,
            cargo: req.body.cargo
        };

        await Usuario.updateOne({cedula:req.params.cedula}, userTemp);
        return res.send("Usuario actualizado con exito");
    } catch (error) {
        console.log(error);
        return res.send("Ha ocurrido un error en la operacion");
    }
};

usuarioaCtrl.deleteUsuario = async (req,res)=>{ 
    try {
        await Usuario.deleteOne({cedula:req.params.cedula});
        return res.send("Usuario eliminado correctamente");
    } catch (error) {
        console.log(error);
        return res.send("Ha ocurrido un error en la operacion");
    }
};

module.exports = usuarioaCtrl;


