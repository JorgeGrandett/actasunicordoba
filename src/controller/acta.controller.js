const actaCtrl = {};
const Acta  = require('../model/acta.model');

const PdfPrinter = require("pdfmake");
const fs = require("fs");
const fonts = require("../assets/fonts/fonts");
const styles = require("../assets/styles/styles");
const defaultStyle = require("../assets/styles/defaultStyle");
const path = require("path");
var printer = new PdfPrinter(fonts);

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
        const acta  = await Acta.findById(req.params.idActa);
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
            cargoOrganizador: req.body.cargoOrganizador,
            fecha: req.body.fecha,
            hora: req.body.hora,
            participantes: req.body.participantes,
            agenda: req.body.agenda,
            notasReunion: req.body.notasReunion,
            puntosAccion: req.body.puntosAccion
        };

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
            cargoOrganizador: req.body.cargoOrganizador,
            fecha: req.body.fecha,
            hora: req.body.hora,
            participantes: req.body.participantes,
            agenda: req.body.agenda,
            notasReunion: req.body.notasReunion,
            puntosAccion: req.body.puntosAccion
        };

        const usuario = await Acta.findById(req.params.idActa);
        if(usuario == null || usuario.length == 0){
            return res.send("No existe una acta con este id");
        }

        await Acta.findByIdAndUpdate(req.params.idActa, actTemp);
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

actaCtrl.descargarActa = async (req,res) => {
    try {
        const acta = await Acta.findById(req.params.idActa);
        if (acta == null || acta.length == 0) {
            return res.status(404).send("No se encontro la acta");
        }

        const rutaimg = "src/assets/img/logoUniCordoba.png";

        var docDefinition = {
            pageSize: "LEGAL",
            pageOrientation: "portrait",
            pageMargins: [40, 100, 30, 30],
            header: function () {
                return [
                    {
                        image: rutaimg,
                        width: 250,
                        height: 70,
                        margin: [30, 15, 5, 20],
                    },
                ];
            },

            content: [
                {
                    stack: [
                        {
                            text: "INFORME ACTA UNICORDOBA",
                            style: "h3",
                            alignment: "center",
                        },
                        {
                            text: "Fecha: "+acta.fecha,
                            style: "h4",
                            alignment: "left",
                            margin:[0,20]
                        },
                        {
                            text: "Hora: "+acta.hora,
                            style: "h4",
                            alignment: "left",
                            margin:[0,20]
                        },
                        {
                            text: [
                                {
                                    text: "ORGANIZADOR: "+acta.nombreOrganizador+".\n", style: "h4", alignment: "left",
                                },
                                {
                                    text: "CARGO DEL ORGANIZADOR: "+acta.cargoOrganizador+".\n", style: "h4", alignment: "left",
                                },
                                {
                                    text: "PARTICIPANTES: "+obtenerParticipantes(acta.participantes)+"\n", style: "h4", alignment: "left",
                                },
                                {
                                    text: "AGENDA: "+acta.agenda+".\n", style: "h4", alignment: "left",
                                },
                                {
                                    text: "NOTAS DE LA REUNION: "+acta.notasReunion+".\n", style: "h4", alignment: "left",
                                },
                                {
                                    text: "PUNTOS DE ACCION: "+obtenerPuntosAccion(acta.puntosAccion), style: "h4", alignment: "left",
                                },
                            ]
                        },
                    ],
                },
            ],
            styles: styles,
            defaultStyle: defaultStyle,
        };
        var temp123;
        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(
            (temp123 = fs.createWriteStream(
                path.join(__dirname, "documents", "ejemploacta.pdf")
            ))
        );
        pdfDoc.end();
        temp123.on("finish", async () => {
          res.download(
            path.join(__dirname, "documents", "ejemploacta.pdf"),
                "NombreArchivo.pdf"
            );
        });
        
    } catch (error) {
        console.log(error)
    }
}

function obtenerParticipantes (participantesActa) {
    var text = "";
    participantesActa.forEach(element => {
        text += element+", ";
    });
    return text;
}

function obtenerPuntosAccion (puntosAccion) {
    var text = "";
    puntosAccion.forEach(element => {
        text += "Punto de accion marcado: " + (element.check == true ? "Si. " : "No. ");
        text += "Tarea: " + element.tarea + ". ";
        text += "Fecha: " + element.fecha + ". " ;
        text += "Progreso: " + element.progreso + ".\n";
    });
    return text;
}

module.exports = actaCtrl;