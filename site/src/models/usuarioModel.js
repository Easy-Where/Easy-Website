var database = require("../database/config")

// Cadastrar gestor no banco de dados 
function cadastrarGestor(nome, telefone, email, senha, pid, fkEmpresa) {
    var instrucao = `INSERT INTO Usuario (nome, telefone, email, senha, cargo, pid, fk_gestor, fk_empresa) VALUES ('${nome}', '${telefone}', '${email}', '${senha}', 'Gestor', '${pid}', 'null', '${fkEmpresa}');`;
    return database.executar(instrucao);
}

// Logar gestor no banco de dados
function loginGestor(email, senha) {
    var instrucao = `SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}' AND cargo = 'Gestor';`;
    return database.executar(instrucao);
}

// Cadastrar técnico no banco de dados
function cadastrarTecnico(nome, telefone, email, senha, pid, fkGestor, fkEmpresa) {
    var instrucao = `INSERT INTO Usuario (nome, telefone, email, senha, cargo, pid, fk_gestor, fk_empresa) VALUES ('${nome}', '${telefone}', '${email}', '${senha}', 'Técnico', '${pid}', '${fkGestor}', '${fkEmpresa}');`;
    return database.executar(instrucao);
}

// Logar técnico no banco de dados
function loginTecnico(email, senha) {
    var instrucao = `SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}' AND cargo = 'Técnico';`;
    return database.executar(instrucao);
}

function validacaoEmpresa(empresa, cnpj, dono) {
    var instrucao = `
        SELECT * FROM Empresa WHERE nome = '${empresa}' AND cnpj = '${cnpj}' AND dono = '${dono}';
    `;

    return database.executar(instrucao);
}

function validacaoEmpresaUsuario(empresa) {
    var instrucao = `
        SELECT * FROM Empresa WHERE nome = '${empresa}';
    `;

    return database.executar(instrucao);
}

function validacaoPidCadastrado(pid) {
    var instrucao = `
        SELECT * FROM Usuario WHERE id = '${pid}';
    `;

    return database.executar(instrucao);
}

module.exports = {
    cadastrarGestor,
    cadastrarTecnico,
    loginGestor,
    loginTecnico,
    validacaoEmpresa,
    validacaoEmpresaUsuario,
    validacaoPidCadastrado
};