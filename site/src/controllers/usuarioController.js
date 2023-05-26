var usuarioModel = require("../models/usuarioModel");

// Cadastrar Gestor
function cadastrarGestor(req, res) {
  let nome = req.body.nomeServer;
  let telefone = req.body.telefoneServer;
  let email = req.body.emailServer;
  let senha = req.body.senhaServer;
  let pid = req.body.senhaServer;
  let fkEmpresa = req.body.fkEmpresaServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (telefone == undefined) {
    res.status(400).send("Seu telefone está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (pid == undefined) {
    res.status(400).send("Seu pid está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("Sua empresa está undefined!");
  } else {
    usuarioModel
      .cadastrarGestor(nome, telefone, email, senha, pid, fkEmpresa)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function entrar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .entrar(email, senha)
      .then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function entrar2(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .entrar2(email, senha)
      .then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function validacaoEmpresa(req, res) {
  var empresa = req.body.empresaServer;
  var cnpj = req.body.cnpjServer;
  var dono = req.body.donoServer;

  if (empresa == undefined) {
    res.status(400).send("Sua empresa está undefined!");
  } else if (cnpj == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (dono == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {
    usuarioModel
      .validacaoEmpresa(empresa, cnpj, dono)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrarUsuario(req, res) {
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var empresaCad = req.body.empresaServer;

  if (empresaCad == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else {
    usuarioModel
      .cadastrarUsuario(nome, email, senha, empresaCad)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function autenticarEmpresa(req, res) {
  var empresaCad = req.body.empresaServer;

  if (empresaCad == undefined) {
    res.status(400).send("Sua empresa está undefined!");
  } else {
    usuarioModel
      .validacaoEmpresaUsuario(empresaCad)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  cadastrarGestor,
  entrar,
  entrar2,
  validacaoEmpresa,
  cadastrarUsuario,
  autenticarEmpresa,
};
