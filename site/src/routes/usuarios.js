var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.post("/validacao", function (req, res) {
    usuarioController.validacaoEmpresa(req, res);
});

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
});

router.post("/cadastrarUsuarioEmpresa", function (req, res) {
    usuarioController.cadastrarUsuarioEmpresa(req, res);
});

router.post("/cadastrarGestor", function (req, res) {
    usuarioController.cadastrarGestor(req, res);
});

router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

module.exports = router;