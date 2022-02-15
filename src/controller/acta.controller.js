const actaCtrl = {};
const Acta  = require('../model/acta.model');

actaCtrl.getActas = async (req,res)=>{
    try {
        const productos  = await Acta.find({});
        res.status(200).json(productos);
        
    } catch (error) {
        console.log(error)
        res.status(400).send("Ocurrio un error en la operaion.")
    }
}

actaCtrl.getActa = async (req,res)=>{
    try {

        const producto  = await Acta.findOne({codigo:req.params.codigo});
        res.status(200).json(producto);
        
    } catch (error) {
        console.log(error)
        res.status(400).send("Ocurrio un error en la operaion.")
    }
}

actaCtrl.createActa = async (req,res)=>{
    try {

       const {     
            nombre,
            codigo,
            descripcion,
            precio,
            unidades
        } = req.body;

        let _producto  =  new Acta({nombre,codigo,descripcion,precio,unidades});
        await _producto.save();

        res.status(201).send('Creado Satisfactoriamente.');
        
    } catch (error) {
        console.log(error)
        res.status(400).send("Ocurrio un error en la operaion.")
    }
}

actaCtrl.editActa = async (req,res)=>{
    try {

       const {     
            nombre,
            codigo,
            descripcion,
            precio,
            unidades
        } = req.body;

        await Acta.updateOne({codigo:req.params.codigo},{nombre,
            codigo,
            descripcion,
            precio,
            unidades});

        res.status(200).send('Actualizado Satisfactoriamente.');
        
    } catch (error) {
        console.log(error)
        res.status(400).send("Ocurrio un error en la operaion.")
    }
}

actaCtrl.deleteActa = async (req,res)=>{
    try {

      

        await Acta.deleteOne({codigo:req.params.codigo});

        res.status(200).send('Eliminado Satisfactoriamente.');
        
    } catch (error) {
        console.log(error)
        res.status(400).send("Ocurrio un error en la operaion.")
    }
}

module.exports = actaCtrl;