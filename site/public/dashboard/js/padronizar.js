const body = document.querySelector("body");
const modeToggle = body.querySelector(".mode-toggle");
const img = document.querySelector("#Logo");
const sidebar = body.querySelector("nav");
const sidebarToggle = body.querySelector(".sidebar-toggle");
const icone = document.querySelector("#mode_light_dark");
const caixa_legenda = body.querySelector(".content_legendas");
const botao_legendas = document.querySelector(".legendas");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    if (sidebar.classList.contains("close")) {
      img.src = "assets/easy-ware-logotipo-close.png";
    } else {
      img.src = "assets/easy-ware-logotipo-light.png";
      icone.classList.replace("uil-moon", "uil-sun");
    }
  } else {
    if (sidebar.classList.contains("close")) {
      img.src = "assets/easy-ware-logotipo-close.png";
    } else {
      img.src = "assets/easy-ware-logotipo-dark.png";
      icone.classList.replace("uil-sun", "uil-moon");
    }
  }
}

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    img.src = "assets/easy-ware-logotipo-close.png";
  } else {
    if (body.classList.contains("dark")) {
      img.src = "assets/easy-ware-logotipo-light.png";
      icone.classList.replace("uil-moon", "uil-sun");
    } else {
      img.src = "assets/easy-ware-logotipo-dark.png";
      icone.classList.replace("uil-sun", "uil-moon");
    }
  }
}

// Modo dark
modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
    if (sidebar.classList.contains("close")) {
      img.src = "assets/easy-ware-logotipo-close.png";
    } else {
      img.src = "assets/easy-ware-logotipo-light.png";
      icone.classList.replace("uil-moon", "uil-sun");
    }
  } else {
    localStorage.setItem("mode", "light");
    if (sidebar.classList.contains("close")) {
      img.src = "assets/easy-ware-logotipo-close.png";
    } else {
      img.src = "assets/easy-ware-logotipo-dark.png";
      icone.classList.replace("uil-sun", "uil-moon");
    }
  }
});

// Fechar e abrir navbar
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    localStorage.setItem("status", "close");
    img.src = "assets/easy-ware-logotipo-close.png";
  } else {
    localStorage.setItem("status", "open");
    if (body.classList.contains("dark")) {
      img.src = "assets/easy-ware-logotipo-light.png";
      icone.classList.replace("uil-moon", "uil-sun");
    } else {
      img.src = "assets/easy-ware-logotipo-dark.png";
      icone.classList.replace("uil-sun", "uil-moon");
    }
  }
});

// Fechar e abrir Legenda
botao_legendas.addEventListener("click", () => {
  caixa_legenda.classList.toggle("fechado");
  if (caixa_legenda.classList.contains("fechado")) {
    localStorage.setItem("status", "fechado");
  } else {
    localStorage.setItem("status", "aberto");
  }
});

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
      pidUsado = user.pid;
    });
  } catch (error) {
    console.log(error);
  }
});

// Teste 
//a função deve ser ativada no "onchange" do input
function receberImagem(){
    //esse #inFiles se refere a uma input do tipo file
    var imagemInput = document.querySelector('#inFiles').files
    //espaço para pré-visualização para o usuario ver como ficou (no meu caso eu deixei uma div vazia mesmo)
    var resultado = document.querySelector('.verificarImagem')

//verifica se recebeu algum arquivo
    if(imagemInput.length > 0){
        var imagemRecebida = imagemInput[0]

//essa classe já existe por padrão no javascript, não precisa importar
        var lerImagem = new FileReader()


        lerImagem.onload = function(imagem){
    //essa variavel armazena a imagem que foi colocada no input
            var novaImagem = imagem.target.result
            
    //usei esse vetor para armazenar a imagem e não envia-la diretamente para o banco
    //dessa forma a imagem só é mandada para o banco se o usuario gostar de como ficou e confirmar
            imagensVetor.push(novaImagem)
            
    //coloca a imagem para a pré-visualização do usuário
            resultado.innerHTML += `
            <div class="visualizacao">
                <img src="${novaImagem}">
                <button onclick="apagarImagem(${contador})"><i class="fa-solid fa-trash"></i>Apagar</button>
            </div>
            `
        }
        
    //readAsDataURL transforma a imagem em texto
        lerImagem.readAsDataURL(imagemRecebida)     
    }
}