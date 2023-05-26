var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

// Rota para cadastro do gestor
router.post("/cadastrarGestor", function (req, res) {
    usuarioController.cadastrarGestor(req, res);
});

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.post("/validacao", function (req, res) {
    usuarioController.validacaoEmpresa(req, res);
});

router.post("/validacao2", function (req, res) {
    usuarioController.autenticarEmpresa(req, res);
});

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/autenticar2", function (req, res) {
    usuarioController.autenticarEmpresa(req, res);
});

router.post("/autenticarUsuario", function (req, res) {
    usuarioController.entrar2(req, res);
});

module.exports = router;