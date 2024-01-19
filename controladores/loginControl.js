'use strict';

const { UUIDV4 } = require('sequelize');
const models = require('./../models');
var usuario = models.usuario;
const uuid = require('uuid');
const {validationResult, body} = require('express-validator');
var jwt = require('jsonwebtoken');


class loginControl{
    async inicio_sesion(req, res){
        let errors = validationResult(req);
        if(errors.isEmpty){
            //buscar por correo o usuario
            const user = await usuario.findOne({
                where:{correo:req.body.correo}
            });
            if(user != null){
                if(user.clave === req.body.clave){
                    if(user.estado){
                        const data = {
                            external: user.external,
                            nombre:user.nombre,
                            check: true
                        };
                        require('dotenv').config();
                        const llave = process.env.KEY;
                        const token = jwt.sign(data, llave, {expiresIn:'12h'});

                        const data1 = {
                            external: user.external,
                            nombre:user.nombre,
                            token: token
                        };

                        res.status(200);
                        res.json({mensaje: "vas bien", code:200, data:data1});
                    } else{
                        res.status(400);
                        res.json({mensaje: "ok", code:400, data:"cuenta inactiva"});
                    }
                } else{
                    res.status(400);
                    res.json({mensaje: "ok", code:400, data:"no se encuentra la cuenta"});
                }
            } else{
                res.status(400);
                res.json({mensaje: "ok", code:400, data:"no se encuentra la cuenta"});
            }
            
        } else {
            res.status(400);
            res.json({mensaje: "hay error", code:400, data:errors});
        }        
    }
}

module.exports = loginControl;