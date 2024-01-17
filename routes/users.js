var express = require('express');
var router = express.Router();

const usuarioA = require('../controladores/usuarioControl');
const usuarioControl = new usuarioA();

const noticiaA = require('../controladores/noticiaControl');
const noticiaControl = new noticiaA();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//USUARIOS
//buscar y listar son get
router.get("/admin/usuarios", usuarioControl.listar);
router.get("/admin/usuarios/:external", usuarioControl.buscar);

//guardar y modificar es post
router.post("/admin/usuarios/guardar", usuarioControl.guardar);
router.post("/admin/usuarios/actualizar", usuarioControl.actualizar);

//NOTICIAS
router.get("/admin/noticias", noticiaControl.listar);
router.post("/admin/noticias/guardar", noticiaControl.guardar);

module.exports = router;
