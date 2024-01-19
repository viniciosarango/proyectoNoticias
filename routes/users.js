var express = require('express');
var router = express.Router();
const {body} = require ('express-validator');


const usuarioA = require('../controladores/usuarioControl');
const usuarioControl = new usuarioA();

const noticiaA = require('../controladores/noticiaControl');
const noticiaControl = new noticiaA();

const loginA = require('../controladores/loginControl');
const loginControl = new loginA();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//USUARIOS
//buscar y listar son get
router.get("/admin/usuarios", usuarioControl.listar);
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
