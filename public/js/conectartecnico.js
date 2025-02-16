// Cadastro de empresa
function avancaPraDois() {
  const nome = nome_input.value;
  const telefone = telefone_input.value;
  const email = emailCad_input.value;
  let validacaoEmail = /^(\w{2,})([._]?\w+)*@(\w{3,})([._]\w{2,})?([.-])[\w]{2,}$/;
  const primeiraEtapa = document.getElementById('primeiraEtapa');
  const segundaEtapa = document.getElementById('segundaEtapa');

  if (nome == "") {
    chamarModal("Campo vazio", "&quotNome&quot está vazio")
  } else if (telefone == "") {
    chamarModal("Campo vazio", "&quotTelefone&quot está vazio")
  } else if (telefone.length < 15) {
    chamarModal("Dado incorreto", "&quotTelefone&quot está incompleto")
  } else if (email == "") {
    chamarModal("Campo vazio", "&quotEmail&quot está vazio")
  } else if (!validacaoEmail.test(email)) {
    chamarModal("Dado incorreto", "E-mail inválido! Certifique-se que<br>seu e-mail segue essa estrutura: nome@example.com")
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
    chamarModal("Campo vazio", "Selecione uma empresa")
  } else if (gestorSelect == "") {
    chamarModal("Campo vazio", "Selecione um gestor")
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
  const confirmacaoVar = confirma_input.value
  
  const usuario = {
    nomeServer: nome_input.value,
    telefoneServer: telefone_input.value.replace(/\D+/g, "").trim(),
    emailServer: emailCad_input.value,
    senhaServer: senha_input.value,
    pidServer: pid_input.value,
    fkGestorServer: fkGestor.value,
    fkEmpresaServer: fkEmpresa.value
  }

    if (usuario.senhaServer == "") {
      chamarModal("Campo vazio", "&quotSenha&quot está vazio")
    } else if (confirmacaoVar == "") {
      chamarModal("Campo vazio", "&quotConfirmação de Senha&quot está vazio")
    } else if (usuario.senhaServer.length <= 8) {
      chamarModal("Aumente a segurança", "A senha deve ter mais de 8 caracteres")
    } else if (confirmacaoVar != usuario.senhaServer) {
      chamarModal("Dado incorreto", "Senhas diferentes")
    } else {
    fetch('/usuarios/cadastrarTecnico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(usuario),
    })
      .then(function (resposta) {
        console.log('resposta: ', resposta);
        if (resposta.ok) {
          textModal.style.background = "#1175d1";
          chamarModal("Cadastro realizado!", "Vamos fazer login?")
          sessionStorage.setItem('EMAIL', usuario.emailServer);
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
    chamarModal("Campo vazio", "&quotE-mail&quot está vazio");
  } else if (senhaVar == "") {
    chamarModal("Campo vazio", "&quotSenha&quot está vazio");
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
            sessionStorage.NOME_USUARIO = json.nome_usuario;
            sessionStorage.ID_USUARIO = json.id_usuario;
            sessionStorage.ID_EMPRESA = json.id_empresa;
            sessionStorage.PID = json.pid;

            setTimeout(function () {
              window.location = "dashboard/paineltecnico.html";
            }, 1000);
          });
        } else {
          chamarModal("Dados inválidos", "&quotE-mail&quot ou &quotSenha&quot inválido");
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

// Select no banco de gestores
async function trazerGestores(){
  let fkEmpresa = selectEmpresas.value;
  selectGestores.innerHTML = `<option value="">-Selecione seu gestor-</option>`;
  try {
    const respondeGestores = await fetch(`/usuarios/selectGestores/${fkEmpresa}`);

    const gestor = await respondeGestores.json();

    gestor.forEach((gestor) => {
      selectGestores.innerHTML += `<option value="${gestor.pid}">${gestor.nome} - ${gestor.pid}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
}