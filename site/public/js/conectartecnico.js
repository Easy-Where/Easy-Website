// Cadastro de empresa
function avancaPraDois() {
  const nome = nome_input.value;
  const telefone = telefone_input.value;
  const email = emailCad_input.value;
  let validacaoEmail = /^(\w{2,})([._]?\w+)*@(\w{3,})([._]\w{2,})?([.-])[\w]{2,}$/;
  const primeiraEtapa = document.getElementById('primeiraEtapa');
  const segundaEtapa = document.getElementById('segundaEtapa');

  if (nome == "") {
    modalErro("Campo vazio", "&quotNome&quot está vazio")
  } else if (telefone == "") {
    modalErro("Campo vazio", "&quotTelefone&quot está vazio")
  } else if (telefone.length < 15) {
    modalErro("Dado incorreto", "&quotTelefone&quot está incompleto")
  } else if (email == "") {
    modalErro("Campo vazio", "&quotEmail&quot está vazio")
  } else if (!validacaoEmail.test(email)) {
    modalErro("Dado incorreto", "E-mail inválido! Certifique-se que<br>seu e-mail segue essa estrutura: nome@example.com")
  } else {
    slideAtual.style.marginLeft = "-300px";
    primeiraEtapa.classList.remove('current');
    segundaEtapa.classList.add('active', 'current');
  }
};

// Finalizar cadastro
function avancaPraTres() {
  const empresaSelect = selectEmpresas.value;
  const gestorSelect = selectGestores.value;
  if (empresaSelect == "") {
    modalErro("Campo vazio", "Selecione uma empresa")
  } else if (gestorSelect == "") {
    modalErro("Campo vazio", "Selecione um gestor")
  } else {
    slideAtual.style.marginLeft = "-600px";
    segundaEtapa.classList.remove('current');
    terceiraEtapa.classList.add('active', 'current');
  }
};

// Cadastrar gestor
function cadastrarTecnico() {
  const fkEmpresa = document.getElementById('selectEmpresas');
  const fkGestor = document.getElementById('selectGestores');

  const usuario = {
    nomeServer: nome_input.value.value,
    telefoneServer: telefone_input.value,
    emailServer: emailCad_input.value,
    senhaServer: senha_input.value,
    confirmacaoVar: confirma_input.value,
    pidServer: pid_input.value,
    fkGestorServer: fkGestor.value != '' ? fkGestor.value : null,
    fkEmpresaServer: fkEmpresa.value != '' ? fkEmpresa.value : null
  }

  let invalido =
    !usuario.nomeServer |
    !usuario.telefoneServer |
    !usuario.emailServer |
    !usuario.senhaServer |
    !usuario.confirmacaoVar |
    !usuario.pidServer |
    !usuario.fkGestorServer |
    !usuario.fkEmpresaServer;

  if (invalido) {
    if (usuario.senhaServer == "") {
      modalErro("Campo vazio", "&quotSenha&quot está vazio")
    } else if (usuario.confirmacaoVar == "") {
      modalErro("Campo vazio", "&quotConfirmação de Senha&quot está vazio")
    } else if (usuario.senhaServer.length <= 8) {
      modalErro("Aumente a segurança", "A senha deve ter mais de 8 caracteres")
    } else if (usuario.confirmacaoVar != usuario.senhaServer) {
      modalErro("Dado incorreto", "Senhas diferentes")
    }
  } else {
    fetch('/usuarios/cadastrarTecnico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(User),
    })
      .then(function (resposta) {
        console.log('resposta: ', resposta);

        if (resposta.ok) {
          textModal.style.background = "#1175d1";
          modalErro("Cadastro realizado!", "Vamos fazer login?")
          sessionStorage.setItem('EMAIL', User.emailServer);
          setTimeout(() => {
            window.location = 'conectartecnico.html';
          }, '2000');
        } else {
          throw 'Houve um erro ao tentar realizar o cadastro!';
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}

// Login tecnico
function loginTecnico() {
  const emailVar = email_login.value;
  const senhaVar = senha_login.value;

  if (emailVar == "") {
    modalErro("Campo vazio", "&quotE-mail&quot está vazio");
  } else if (senhaVar == "") {
    modalErro("Campo vazio", "&quotSenha&quot está vazio");
  } else {
    fetch("/usuarios/loginTecnico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailServer: emailVar,
        senhaServer: senhaVar,
      }),
    })
      .then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!");

        if (resposta.ok) {
          console.log(resposta);

          resposta.json().then((json) => {
            console.log(json);
            console.log(JSON.stringify(json));

            sessionStorage.EMAIL_USUARIO = json.email;
            sessionStorage.NOME_USUARIO = json.nome;
            sessionStorage.ID_USUARIO = json.id;

            setTimeout(function () {
              window.location = "dashboardtecnico.html";
            }, 1000);
          });
        } else {
          console.log("Houve um erro ao tentar realizar o login!");

          resposta.text().then((texto) => {
            console.error(texto);
          });
        }
      })
      .catch(function (erro) {
        console.log(erro);
      });
    return false;
  }
}