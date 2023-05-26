var database = require("../database/config")

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}' AND cargo = 'Gestor';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar2(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}' AND cargo = 'Tecnico';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
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

function cadastrarGestor(nome, telefone, email, senha, empresaCad) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    var instrucao = `
        INSERT INTO Usuario (nome, telefone, email, senha, cargo, fk_empresa) 
            VALUES ('${nome}', '${telefone}', '${email}', '${senha}', 'Gestor', '${empresaCad}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarUsuario(nome, email, senha, empresaCad) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    var instrucao = `
        INSERT INTO Usuario (PID, nome, email, senha, cargo, fk_empresa) 
            VALUES ('${pid}', '${nome}', '${email}', '${senha}', 'Tecnico', '${empresaCad}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    entrar2,
    validacaoEmpresa,
    cadastrarGestor,
    cadastrarUsuario,
    validacaoEmpresaUsuario,
    validacaoPidCadastrado
};