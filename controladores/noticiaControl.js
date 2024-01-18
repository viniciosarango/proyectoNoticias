'use strict';

const { UUIDV4 } = require('sequelize');
const models = require('./../models');
var noticia = models.noticia;
var usuario = models.usuario;
const uuid = require('uuid');

class noticiaControl{
    async listar(req, res){
        const lista = await noticia.findAll({
            attributes: ['titulo', 'cuerpo', 'fecha', 'external', 'estado']            
        });
        res.status(200);
        res.json({mensaje: "OK", code:200, data:lista})
    }
    
    async guardar(req, res){

        const userNoticia = await usuario.findOne({            
            where:{external:req.body.external_usuario}            
        });

        if(userNoticia != null){
            const data = {
                titulo : req.body.titulo,
                cuerpo : req.body.cuerpo,
                fecha : req.body.fecha,
                external : uuid.v4(),
                usuarioId : userNoticia.id
            };
    
            let noticiaA = await noticia.create(data);
            
            if(noticiaA != null && noticiaA != undefined){
                res.status(200);
                res.json({mensaje: "OK", code:200, data:"Se ha registrado la noticia"});
            } else {
                res.status(400);
                res.json({mensaje: "Solicitud fallida", code:400, data:"No se ha registrado la noticia"});
            }
        } else{
            res.status(400);
            res.json({mensaje: "Error", code:400, data:"Usuario no encontrado"});
        }        
    }


    async buscar(req, res){
        const noticia_buscar = await noticia.findOne({            
            where:{external:req.params.external_noticia}            
        });
        res.status(200);

        if(noticia_buscar!=null){
            res.json({mensaje: "OK", code:200, data:noticia_buscar})
        } else{
            res.json({mensaje: "Solicitud erronea", code:400, data:[]})
        }        
    }

/*
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
    }*/
}

//para exportar la clase
module.exports=noticiaControl;