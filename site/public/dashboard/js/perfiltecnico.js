// Ver senha 
const input = document.querySelector("#senha");
const versenha_gestor = document.querySelector("#trocarFigura");
versenha_gestor.addEventListener('click', togglePass);

function togglePass() {
    if (input.type == "password") {
        input.type = "text";
        versenha_gestor.classList.replace("uil-eye", "uil-eye-slash")
    } else {
        input.type = "password";
        versenha_gestor.classList.replace("uil-eye-slash", "uil-eye")
    }
}

// Ver confirmação de senha
const input4 = document.querySelector("#confirmasenha");
const versenha_gestor2 = document.querySelector("#confirmatrocarFigura");
versenha_gestor2.addEventListener('click', togglePass4);

function togglePass4() {
    if (input4.type == "password") {
        input4.type = "text";
        versenha_gestor2.classList.replace("uil-eye", "uil-eye-slash")
    } else {
        input4.type = "password";
        versenha_gestor2.classList.replace("uil-eye-slash", "uil-eye")
    }
}

// Trocar Imagem
const image = document.getElementById("imagem_perfil")
const image2 = document.getElementById("imagem_perfil_sidebar")
const input_trocavel = document.getElementById("input_troca_imagem")

input_trocavel.addEventListener("change", () => {
    image.src = URL.createObjectURL(input_trocavel.files[0]);
    image2.src = URL.createObjectURL(input_trocavel.files[0]);
});

// Resetar inputs
function resetarInputs() {
    nome_input.value = ''
    sobrenome_input.value = ''
    email_input.value = ''
    senha.value = ''
    confirmasenha.value = ''
}