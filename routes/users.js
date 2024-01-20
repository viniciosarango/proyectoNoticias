var express = require('express');
var router = express.Router();
const {body} = require ('express-validator');
let jwt=require('jsonwebtoken')


const usuarioA = require('../controladores/usuarioControl');
const usuarioControl = new usuarioA();

const noticiaA = require('../controladores/noticiaControl');
const noticiaControl = new noticiaA();

const loginA = require('../controladores/loginControl');
const loginControl = new loginA();

let auth = function middleware(req, res, next){
  const token = req.headers["api-token"];
  console.log(token);
  if(token === undefined){
    res.status(403);
    res.json({ mensaje: "ok", code: 403, data: "no se envió token" });
  } else {
    require('dotenv').config();
    const llave = process.env.KEY;
    jwt.verify(token, llave, async (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({ mensaje: "ok", code: 401, data: "token no válido", error: err });
      } else {
        const models = require('./../models');
        var usuario = models.usuario;
        let auxU = await usuario.findOne({
          where: { external: decoded.external }
        });

        if (auxU === null) {
          res.status(401);
          res.json({ mensaje: "ok", code: 401, data: "token no válido" });
        } else {
          next();
        }
      }
    });
  }
};


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//USUARIOS
//buscar y listar son get
router.get("/admin/usuarios", auth, usuarioControl.listar);
router.get("/admin/usuarios/:external", usuarioControl.buscar);

router.post(
  "/admin/usuarios/guardar", 
  [
    body('nombre', 'ingrese un nombre valido').trim().exists().not().isEmpty(),
    body('correo', 'ingrese un correo valido').trim().exists().not().isEmpty().isEmail(),
    body('clave', 'ingrese una clave valida').trim().exists().not().isEmpty()
  ],
  usuarioControl.guardar
);

router.post("/admin/usuarios/actualizar", usuarioControl.actualizar);

//NOTICIAS
router.get("/admin/noticias", noticiaControl.listar);
router.post("/admin/noticias/guardar", noticiaControl.guardar);
router.get("/admin/noticias/:external_noticia", noticiaControl.buscar);
router.post("/admin/noticias/actualizar", noticiaControl.actualizar);

//LOGIN

router.post(
  "/login", 
  [    
    body('correo', 'ingrese un correo valido').trim().exists().not().isEmpty().isEmail(),
    body('clave', 'ingrese una clave valida').trim().exists().not().isEmpty()
  ],
  loginControl.inicio_sesion
);



module.exports = router;
