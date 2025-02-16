let pidsExistentes = [];
gerarNumeroPid();

// Validar PID existente
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/usuarios/selectPID");

    const usuario = await response.json();

    usuario.forEach((user) => {
      pidsExistentes.push(user.pid);
      console.log("PIDS ATUAIS:" + pidsExistentes);
    });
  } catch (error) {
    console.log(error);
  }
});

// Gerar PID
const inputPid = document.getElementById("pid_input");
function gerarNumeroPid() {
  let pidGerado = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  if(pidsExistentes.includes(pidGerado)){
    gerarNumeroPid()
  }else{
    pid_input.value = pidGerado;
    console.log("Novo valor a ser iputado: " + pid_input.value)
  }
}

// Div de validação
let divValidacao = document.querySelector(".validacao");
let textModal = document.querySelector(".titulo_validacao");
let textValidacao = document.querySelector(".texto_validacao");

// Modal de erro
function chamarModal(frase1, frase2) {
  textModal.innerHTML = frase1;
  textValidacao.innerHTML = frase2;
  divValidacao.classList.add("active");

  setTimeout(() => {
    divValidacao.classList.remove("active");
  }, 3000);
}

// Padronizar Telefone
function maskPhone() {
  let phone = telefone_input.value.replace(/\D+/g, "").trim();

  if (phone.length > 11) {
    return false;
  }

  if (phone.length > 10) {
    phone = phone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (phone.length > 6) {
    phone = phone.replace(/^(\d{2})(\d{4})/, "($1) $2-");
  } else if (phone.length > 1) {
    phone = phone.replace(/^(\d{2})/, "($1) ");
  }

  telefone_input.value = phone;
}

// Cadastrar vendedor
const fkEmpresa = sessionStorage.getItem("FK_EMPRESA");
function cadastrarVendedor() {
  const fkGestor = sessionStorage.getItem("PID");
  const confirmacaoVar = confirma_input.value;

  const usuario = {
    nomeServer: nome_input.value,
    telefoneServer: telefone_input.value.replace(/\D+/g, "").trim(),
    emailServer: email_input.value,
    senhaServer: senha_input.value,
    pidServer: pid_input.value,
    fkGestorServer: fkGestor,
    fkEmpresaServer: fkEmpresa,
  };

  if (usuario.nomeServer == "") {
    chamarModal("Campo vazio", "&quotNome&quot está vazio");
  } else if (usuario.telefoneServer == "") {
    chamarModal("Campo vazio", "&quotTelefone&quot está vazio");
  } else if (usuario.emailServer == "") {
    chamarModal("Campo vazio", "&quotE-mail&quot está vazio");
  } else if (usuario.senhaServer == "") {
    chamarModal("Campo vazio", "&quotSenha&quot está vazio");
  } else if (confirmacaoVar == "") {
    chamarModal("Campo vazio", "&quotConfirmação de Senha&quot está vazio");
  } else if (usuario.senhaServer.length <= 8) {
    chamarModal("Aumente a segurança", "A senha deve ter mais de 8 caracteres");
  } else if (confirmacaoVar != usuario.senhaServer) {
    chamarModal("Dado incorreto", "Senhas diferentes");
  } else {
    fetch("/usuarios/cadastrarVendedor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(usuario),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          textModal.style.background = "#1175d1";
          chamarModal("Cadastro realizado!", "Passe o acesso ao vendedor");
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}

// Select no banco de técnicos
async function trazerTecnicos() {
  selectTecnicos.innerHTML = `<option value="">-Selecione seu gestor-</option>`;
  try {
    const respondeTecnicos = await fetch(`/usuarios/selectTecnicos/${fkEmpresa}`);

    const tecnico = await respondeTecnicos.json();

    tecnico.forEach((tecnico) => {
      selectTecnicos.innerHTML += `<option value="${tecnico.pid}">${tecnico.nome} - ${tecnico.pid}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
}

// Select no banco de vendedores
async function trazerVendedores() {
  selectVendedor.innerHTML = `<option value="">-Selecione seu vendedor-</option>`;
  try {
    const respondeVendedor = await fetch(`/usuarios/selectVendedor/${fkEmpresa}`);

    const vendedor = await respondeVendedor.json();

    vendedor.forEach((vendedor) => {
      selectVendedor.innerHTML += `<option value="${vendedor.pid}">${vendedor.nome} - ${vendedor.pid}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
}
