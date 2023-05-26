var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

// Rota para criar empresa
router.post("/cadastrarEmpresa", function (req, res) {
    empresaController.cadastrarEmpresa(req, res);
});