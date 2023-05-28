// Exibir e definir informações do usuário
const emailUsuario = sessionStorage.getItem("emailUser");
const senhaUsuario = sessionStorage.getItem("senhaUser");
let pidUsado = 0

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`/usuarios/exibirPIDUsuario/${emailUsuario}/${senhaUsuario}`);

    const dataUser = await response.json();

    dataUser.forEach((user) => {
      puxarNome.innerHTML = user.nome;
      puxarPID.innerHTML = user.pid;
      atualizarPID(user.pid)
    });

  } catch (error) {
    console.log(error);
  }
});

function atualizarPID(pid){
  pidUsado = pid;
  sessionStorage.setItem('pidUser', pidUsado);
}

// Div de validação
let divValidacao = document.querySelector(".validacao");
let textModal = document.querySelector(".titulo_validacao");
let textValidacao = document.querySelector(".texto_validacao");

// Modal de erro
function modalErro(frase1, frase2) {
  textModal.innerHTML = frase1;
  textValidacao.innerHTML = frase2;
  divValidacao.classList.add("active");

  setTimeout(() => {
    divValidacao.classList.remove("active");
  }, 3000);
}

// Trocar Imagem
const image = document.getElementById("imagem_perfil")
const image2 = document.getElementById("imagem_perfil_sidebar")
const input_trocavel = document.getElementById("input_troca_imagem")

input_trocavel.addEventListener("change", () => {
  image.src = URL.createObjectURL(input_trocavel.files[0]);
  image2.src = URL.createObjectURL(input_trocavel.files[0]);
});

// Ver e cobrir senha
function verSenha(input, icone) {
  if (input.type == "password") {
    input.type = "text";
    icone.classList.replace("uil-eye", "uil-eye-slash");
  } else {
    input.type = "password";
    icone.classList.replace("uil-eye-slash", "uil-eye");
  }
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

// Resetar inputs
function resetarInputs() {
  nome_input.value = ''
  telefone_input.value = ''
  email_input.value = ''
  senha_input.value = ''
  confirmasenha_input.value = ''
}

// Atualizar dados do usuário
function atualizarDados() {
  let validacaoEmail = /^(\w{2,})([._]?\w+)*@(\w{3,})([._]\w{2,})?([.-])[\w]{2,}$/;
  const confirmacaoVar = confirmasenha_input.value
  const pidUsuario = sessionStorage.getItem("pidUser");

  const usuario = {
    nomeServer: nome_input.value,
    telefoneServer: telefone_input.value.replace(/\D+/g, "").trim(),
    emailServer: email_input.value,
    senhaServer: senha_input.value,
  };

  if (usuario.nomeServer == "") {
    modalErro("Campo vazio", "&quotNome&quot está vazio");
  } else if (usuario.telefoneServer == "") {
    modalErro("Campo vazio", "&quotTelefone&quot está vazio");
  } else if (usuario.emailServer == "") {
    modalErro("Campo vazio", "&quotE-mail&quot está vazio");
  } else if (usuario.senhaServer == "") {
    modalErro("Campo vazio", "&quotSenha&quot está vazio");
  } else if (usuario.telefoneServer.length < 11) {
    modalErro("Dado incorreto", "&quotTelefone&quot está incompleto");
  } else if (!validacaoEmail.test(usuario.emailServer)) {
    modalErro("Dado incorreto", "E-mail inválido! Certifique-se que<br>seu e-mail segue essa estrutura: nome@example.com");
  } else if (usuario.senhaServer.length <= 8) {
    modalErro("Aumente a segurança", "A senha deve ter mais de 8 caracteres");
  } else if (confirmacaoVar != usuario.senhaServer) {
    modalErro("Dado incorreto", "Senhas diferentes");
  } else {
    console.log(pidUsuario)
    fetch(`/usuarios/atualizarDados/${pidUsuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((resposta) => {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
          modalErro("Dados atualizados!", "Recarregue a página");
        } else {
          throw "Houve um erro ao tentar atualizar os dados!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}