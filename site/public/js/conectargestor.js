// Alternar entre cadastro de empresa
let contador = 0;

// Cadastro de empresa
function avancaPraDois() {
  const nome = nome_input.value;
  const telefone = telefone_input.value;
  const email = emailCad_input.value;
  let validacaoEmail = /^(\w{2,})([._]?\w+)*@(\w{3,})([._]\w{2,})?([.-])[\w]{2,}$/;
  const primeiraEtapa = document.getElementById("primeiraEtapa");
  const segundaEtapa = document.getElementById("segundaEtapa");

  if (nome == "") {
    chamarModal("Campo vazio", "&quotNome&quot está vazio");
  } else if (telefone == "") {
    chamarModal("Campo vazio", "&quotTelefone&quot está vazio");
  } else if (telefone.length < 15) {
    chamarModal("Dado incorreto", "&quotTelefone&quot está incompleto");
  } else if (email == "") {
    chamarModal("Campo vazio", "&quotEmail&quot está vazio");
  } else if (!validacaoEmail.test(email)) {
    chamarModal("Dado incorreto", "E-mail inválido! Certifique-se que<br>seu e-mail segue essa estrutura: nome@example.com");
  } else {
    slideAtual.style.marginLeft = "-300px";
    primeiraEtapa.classList.remove("current");
    segundaEtapa.classList.add("active", "current");
  }
}

// Finalizar cadastro
function avancaPraTres() {
  if (contador == 0) {
    const empresaSelect = selectEmpresas.value;
    if (empresaSelect == "") {
      chamarModal("Campo vazio", "Selecione uma empresa");
    } else {
      slideAtual.style.marginLeft = "-600px";
      segundaEtapa.classList.remove("current");
      terceiraEtapa.classList.add("active", "current");
    }
  } else {
    const empresa = empresa_input.value;
    const cnpj = cnpj_input.value;
    const dono = dono_input.value;
    const segundaEtapa = document.getElementById("segundaEtapa");
    const terceiraEtapa = document.getElementById("terceiraEtapa");

    if (empresa == "") {
      chamarModal("Campo vazio", "&quotEmpresa&quot está vazio");
    } else if (cnpj == "") {
      chamarModal("Campo vazio", "&quotCPNJ&quot está vazio");
    } else if (cnpj.length < 18) {
      chamarModal("Dado incorreto", "CNPJ está incompleto");
    } else if (dono == "") {
      chamarModal("Campo vazio", "&quotDono&quot está vazio");
    } else {
      slideAtual.style.marginLeft = "-600px";
      segundaEtapa.classList.remove("current");
      terceiraEtapa.classList.add("active", "current");
    }
  }
}

// Cadastrar nova empresa
function div_cadastro_empresa() {
  contador++;
  cadastrar_empresa.innerHTML = `
  <h1>Sobre sua empresa</h1>
  <div class="field">
   <div class="input-group">
     <input required="" type="text" id="empresa_input" />
     <label class="user-label">Empresa</label>
   </div>
   <div class="input-group">
     <input required="" type="text" id="cnpj_input" maxlength="18" onkeyup="maskCNPJ(event)" />
     <label class="user-label">CNPJ</label>
   </div>
   <div class="input-group">
     <input required="" type="text" id="dono_input" />
     <label class="user-label">Dono</label>
   </div> 
  </div>
  <div class="btn">
    <button type="button" id="prev-btn" onclick="voltarCadastro()">
      Cancelar
    </button>
    <button type="button" id="next-btn2" onclick="cadastrarEmpresa()">
      Cadastrar
    </button>
  </div>`;
}

// Voltar a seleção de empresa
function voltarCadastro() {
  contador--;
  cadastrar_empresa.innerHTML = `
  <h1>Sobre sua empresa</h1>
  <div class="field">
    <div class="input-group">
      <select required="" id="selectEmpresas">
        <option value="">-Escolha sua empresa-</option>
      </select>
    </div>
    <div class="cadastro_empresa">
      <p>Não encontrou sua empresa? Cadastre aqui!</p>
      <i class="uil uil-plus-circle" onclick="div_cadastro_empresa()"></i>
    </div>
  </div>
  <div class="btn">
    <button type="button" id="prev-btn" onclick="voltaPraUm()">
      <img src="assets/prev.svg" alt="" />
    </button>
    <button type="button" id="next-btn2" onclick="avancaPraTres()">
      <img src="assets/next.svg" alt="" />
    </button>
  </div>`;
  selecionarEmpresas()
}

// Cadastrar empresas
function cadastrarEmpresa() {
  const Enterprise = {
    empresaServer: empresa_input.value,
    cnpjServer: cnpj_input.value.replace(/\D+/g, "").trim(),
    donoServer: dono_input.value,
  };

  const validInput =
    Enterprise.empresaServer && Enterprise.cnpjServer && Enterprise.donoServer;

  if (validInput) {
    fetch("/empresas/cadastrarEmpresa", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(Enterprise),
    })
      .then((res) => {
        if (res.ok) {
          chamarModal("Cadastro realizado!", "Sua empresa está em nosso sistema");
          setTimeout(() => {
            voltarCadastro();
          }, 2000);
        }
      })
      .catch((error) => {
        console.log("ERRO:", error);
      });
    return false;
  } else {
    textModal.style.background = "#1175d1";
    if (Enterprise.empresaServer == "") {
      chamarModal("Campo vazio", "&quotNome&quot está vazio");
    } else if (Enterprise.cnpjServer == "") {
      chamarModal("Campo vazio", "&quotCNPJ&quot está vazio");
    } else if (Enterprise.donoServer == "") {
      chamarModal("Campo vazio", "&quotDono&quot está vazio");
    }
  }
}

// Cadastrar gestor
function cadastrarGestor() {
  const fkEmpresa = document.getElementById("selectEmpresas");
  const confirmacaoVar = confirma_input.value

  const usuario = {
    nomeServer: nome_input.value,
    telefoneServer: telefone_input.value.replace(/\D+/g, "").trim(),
    emailServer: emailCad_input.value,
    senhaServer: senha_input.value,
    pidServer: pid_input.value,
    fkEmpresaServer: fkEmpresa.value,
  };

  if (usuario.senhaServer == "") {
    chamarModal("Campo vazio", "&quotSenha&quot está vazio");
  } else if (confirmacaoVar == "") {
    chamarModal("Campo vazio", "&quotConfirmação de Senha&quot está vazio");
  } else if (usuario.senhaServer.length <= 8) {
    chamarModal("Aumente a segurança", "A senha deve ter mais de 8 caracteres");
  } else if (confirmacaoVar != usuario.senhaServer) {
    chamarModal("Dado incorreto", "Senhas diferentes");
  } else {
    fetch("/usuarios/cadastrarGestor", {
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
          chamarModal("Cadastro realizado!", "Vamos fazer login?");
          sessionStorage.setItem("EMAIL", usuario.emailServer);
          setTimeout(() => {
            window.location = "conectargestor.html";
          }, "2000");
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

// Login gestor
function loginGestor() {
  const emailVar = email_login.value;
  const senhaVar = senha_login.value;

  if (emailVar == "") {
    chamarModal("Campo vazio", "&quotE-mail&quot está vazio");
  } else if (senhaVar == "") {
    chamarModal("Campo vazio", "&quotSenha&quot está vazio");
  } else {
    fetch("/usuarios/loginGestor", {
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

            sessionStorage.setItem('emailUser', emailVar);
            sessionStorage.setItem('senhaUser', senhaVar);

            setTimeout(function () {
              window.location = "dashboard/dashboardgestor.html";
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

//Select de empresas
async function selecionarEmpresas() {
  try {
    const response = await fetch("/empresas/selectEmpresas");

    const empresas = await response.json();

    empresas.forEach((empresa) => {
      selectEmpresas.innerHTML += `<option value="${empresa.id}">${empresa.nome}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
}
