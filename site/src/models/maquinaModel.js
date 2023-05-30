var database = require("../database/config");

function selectMaquinas(pid) {
  var instrucao = `SELECT u.nome AS usuario,
  m.sistema_operacional AS so,
  m.id AS id_maquina,
  r.uso_cpu AS uso_cpu
FROM empresa e
JOIN usuario u ON u.id_empresa = e.id
JOIN maquina m ON m.id_empresa = e.id
JOIN componente_maquina cm ON cm.id_maquina = m.id AND cm.id_empresa = e.id
JOIN componente c ON c.id = cm.id_componente
JOIN registro r ON r.id_componente_maquina = cm.id
WHERE e.id = ${pid};`;
  return database.executar(instrucao);
}

module.exports = {
  selectMaquinas,
};
