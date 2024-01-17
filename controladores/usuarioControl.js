'use strict';

const { UUIDV4 } = require('sequelize');
const models = require('./../models');
var usuario = models.usuario;
const uuid = require('uuid');

class usuarioControl{
    async listar(req, res){
        const lista = await usuario.findAll();
        res.status(200);
        res.json({mensaje: "OK", code:200, data:lista})
    }
    
    async guardar(req, res){
        const data = {
            nombre : req.body.nombre,
            clave : req.body.clave,
            correo : req.body.correo,
            external : uuid.v4()
        };

        let user = await usuario.create(data);
        
        if(user != null && user != undefined){
            res.status(200);
            res.json({mensaje: "OK", code:200, data:"Se ha registrado"});
        } else {
            res.status(400);
            res.json({mensaje: "Solicitud fallida", code:400, data:"No se ha registrado"});
        }
    }
}

//para exportar la clase
module.exports=usuarioControl;