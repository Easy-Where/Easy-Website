var maquinaModel = require("../models/maquinaModel");

// Puxar máquinas no painel
function selectMaquinas(req, res) {
  const pid = req.params.pidUsado;
  maquinaModel
    .selectMaquinas(pid)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.sqlMessage);
    });
}

module.exports = {
  selectMaquinas
};
