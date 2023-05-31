let layoutModalFuncioanrio = document.querySelector(".modalCadastroFuncionario")


function cadastrarMaquina(){
    // layoutModalMaquina.style.top = "0"
    layoutModalMaquina.classList.add('fundo')
}

function closeModalMaquina(){
    // layoutModalMaquina.style.top = "-100vh"
    // modalMaquina.style.left = "-300%"
    layoutModalMaquina.classList.remove('fundo')
}

function cadastrarFuncionario(){
    // modalMaquina.style.left = "30%"
    layoutModalFuncioanrio.classList.add('fundo')
}

function closeModalFuncionario(){
    // layoutModalMaquina.style.top = "-100vh"
    // modalMaquina.style.left = "-300%"
    layoutModalFuncioanrio.classList.remove('fundo')
}