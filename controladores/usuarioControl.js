'use strict';

const { UUIDV4 } = require('sequelize');
const models = require('./../models');
var usuario = models.usuario;
const uuid = require('uuid');
const {validationResult} = require('express-validator');


class usuarioControl{
    async listar(req, res){
        const lista = await usuario.findAll({
            attributes: ['nombre', 'correo', 'external', 'estado']            
        });
        res.status(200);
        res.json({mensaje: "OK", code:200, data:lista})
    }
    
    async guardar(req, res){
        let errors = validationResult(req);
        if(errors.isEmpty){
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
        } else {
            res.status(400);
            res.json({mensaje: "hay error", code:400, data:errors});
        }        
    }


    async buscar(req, res){
        const user = await usuario.findOne({
            attributes: ['nombre', 'correo', 'external', 'estado'],
            where:{external:req.params.external}            
        });
        res.status(200);

        if(user!=null){
            res.json({mensaje: "OK", code:200, data:user})
        } else{
            res.json({mensaje: "Solicitud erronea", code:400, data:[]})
        }        
    }


    async actualizar(req, res){
        const user = await usuario.findOne({            
            where:{external:req.body.external}            //debe ser con post, entonces se usa body
        });        

        if(user!=null){
            user.nombre=req.body.nombre;            
            user.clave=req.body.clave;
            user.external=uuid.v4();
            const userA = await user.save();

            if(userA != null && userA != undefined){
                res.status(200);
                res.json({mensaje: "OK", code:200, data:"Registro actualizado"});
            } else {
                res.status(400);
                res.json({mensaje: "Solicitud fallida", code:400, data:"No se actualizo"});
            }

        } else{
            res.json({mensaje: "Solicitud no valida", code:400, data:"Usuario nol encontrado"})
        }        
    }
}

//para exportar la clase
module.exports=usuarioControl;