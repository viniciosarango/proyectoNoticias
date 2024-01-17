'use strict';

const models = require('./../models');
var usuario = models.usuario;
var UUID = require('uuid');

class usuarioControl{
    async listar(req, res){
        const lista = await usuario.findAll();
        res.status(200);
        res.json({mensaje: "OK", code:200, data:lista})
    }
}

//para exportar la clase
module.exports=usuarioControl;