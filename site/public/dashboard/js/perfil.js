const pid = sessionStorage.getItem('PID');
const id = sessionStorage.getItem('ID_USUARIO');

window.onload = function () {
  dadosFacilitadores(pid)
};

// Trazer dados para facilitar o perfil do usuário
function dadosFacilitadores(pidUser) {
  puxarPID.innerHTML = pidUser
  fetch(`/usuarios/dadosFacilitadores/${pidUser}`).then((resposta) => {
    if (resposta.ok) {
      resposta.json().then((usuario) => {
        console.log(usuario)
        puxarNome.innerHTML = usuario[0].nome;
        puxarNomeModal.innerHTML = usuario[0].nome;
        nome_input.value = usuario[0].nome;
        telefone_input.value = usuario[0].telefone;
        maskPhone()
        email_input.value = usuario[0].email;
      });
    } else {
      console.error('Erro na resposta do servidor');
    }
  });
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

  const usuario = {
    nomeServer: nome_input.value,
    telefoneServer: telefone_input.value.replace(/\D+/g, "").trim(),
    emailServer: email_input.value,
    senhaServer: senha_input.value,
  };

  if (usuario.nomeServer == "") {
    chamarModal("Campo vazio", "&quotNome&quot está vazio");
  } else if (usuario.telefoneServer == "") {
    chamarModal("Campo vazio", "&quotTelefone&quot está vazio");
  } else if (usuario.emailServer == "") {
    chamarModal("Campo vazio", "&quotE-mail&quot está vazio");
  } else if (usuario.senhaServer == "") {
    chamarModal("Campo vazio", "&quotSenha&quot está vazio");
  } else if (usuario.telefoneServer.length < 11) {
    chamarModal("Dado incorreto", "&quotTelefone&quot está incompleto");
  } else if (!validacaoEmail.test(usuario.emailServer)) {
    chamarModal("Dado incorreto", "E-mail inválido! Certifique-se que<br>seu e-mail segue essa estrutura: nome@example.com");
  } else if (usuario.senhaServer.length <= 8) {
    chamarModal("Aumente a segurança", "A senha deve ter mais de 8 caracteres");
  } else if (confirmacaoVar != usuario.senhaServer) {
    chamarModal("Dado incorreto", "Senhas diferentes");
  } else {
    fetch(`/usuarios/atualizarDados/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((resposta) => {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
          textModal.style.background = "#1175d1";
          chamarModal("Dados atualizados!", "Recarregando a página");
          setTimeout(function () {
            location.reload()
          }, 2000);
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

// Abrir modal para excluir o usuário
const divExcluir = document.querySelector('.deletar_container')
function chamarModalExclusao() {
  divExcluir.classList.add('active');
}

// Fechar modal para excluir o usuário
function fecharModalExclusao() {
  divExcluir.classList.remove('active');
  modalDelete.innerHTML = `
  <div class="fechar_excluir" onclick="fecharModalExclusao()">
    <i class="uil uil-times"></i>
  </div>
  <div class="title_excluir">
    <p><span id="puxarNomeModal">...</span>, aqui você vai excluir a sua conta, tem certeza que deseja continuar essa ação?</p>
  </div>
  <div class="botoes_excluir">
    <button onclick="confirmaExcluirUsuario()">Sim</button>
    <button onclick="fecharModalExclusao()">Cancelar</button>
  </div>
    `
}

// Confirma exclusão do usuário
function confirmaExcluirUsuario() {
  modalDelete.innerHTML = `
    <div class="fechar_excluir" onclick="fecharModalExclusao()">
      <i class="uil uil-times"></i>
    </div>
    <div class="title_excluir excluirAlternativa">
      <p><span id="puxarNomeModal">...</span>, insira seu PID para confirmar a ação</p>
      <div class="input-group">
        <input required type="text" maxlength="6"/>
        <label class="user-label">PID</label>
      </div>
    </div>
    <div class="botoes_excluir">
      <button onclick="apagarUsuario()">Sim</button>
      <button onclick="fecharModalExclusao()">Cancelar</button>
    </div>`
}

// Apagar usuário
function apagarUsuario() {
  fetch(`/usuarios/apagarUsuario/${pid}/${id}`, {
    method: 'DELETE',
  }).then(async (res) => {
    if (res.ok) {
      const text = await res.text();
      if (text) {
        const data = JSON.parse(text);
        console.log(data);
        setTimeout(() => {
          window.location = "../index.html";
        }, 2500);
      }
      chamarModal('Usuário excluído', 'Redirecionando ao início...');
    } else {
      console.error('Erro ao excluir o usuário');
    }
  });
}

// Apagar usuário
function apagarUsuarioTecnico() {
  fetch(`/usuarios/apagarUsuarioTecnico/${pid}/${id}`, {
    method: 'DELETE',
  }).then(async (res) => {
    if (res.ok) {
      const text = await res.text();
      if (text) {
        const data = JSON.parse(text);
        console.log(data);
        setTimeout(() => {
          window.location = "../index.html";
        }, 2500);
      }
      chamarModal('Usuário excluído', 'Redirecionando ao início...');
    } else {
      console.error('Erro ao excluir o usuário');
    }
  });
}