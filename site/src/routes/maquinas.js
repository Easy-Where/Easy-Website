var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

// Rota para exibir máquinas no painel
router.get("/selectMaquinas/:pidUsado", (req, res) => {
  maquinaController.selectMaquinas(req, res);
});

module.exports = router;