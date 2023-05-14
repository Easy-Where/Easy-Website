// Ver senha 
const input = document.querySelector("#senha");
const img2 = document.querySelector("#trocarFigura");
img2.addEventListener('click', togglePass);

function togglePass() {
    if (input.type == "password") {
        input.type = "text";
        img2.src = 'assets/perfilescondersenha.png'
    } else {
        input.type = "password";
        img2.src = 'assets/perfilversenha.png'
    }
}

// Ver confirmação de senha
const input4 = document.querySelector("#confirmasenha");
const img4 = document.querySelector("#confirmatrocarFigura");
img4.addEventListener('click', togglePass4);

function togglePass4() {
    if (input4.type == "password") {
        input4.type = "text";
        img4.src = 'assets/perfilescondersenha.png'
    } else {
        input4.type = "password";
        img4.src = 'assets/perfilversenha.png'
    }
}

// Ver senha PID
const input3 = document.querySelector("#pid");
const img3 = document.querySelector("#trocarFigurapid");
img3.addEventListener('click', togglePass3);

function togglePass3() {
    if (input3.type == "password") {
        input3.type = "text";
        img3.src = 'assets/perfilescondersenha.png'
    } else {
        input3.type = "password";
        img3.src = 'assets/perfilversenha.png'
    }
}

const image = document.getElementById("imagem_perfil")
const image2 = document.getElementById("imagem_perfil_sidebar")
const input_trocavel = document.getElementById("input_troca_imagem")

input_trocavel.addEventListener("change", () => {
    image.src = URL.createObjectURL(input_trocavel.files[0]);
    image2.src = URL.createObjectURL(input_trocavel.files[0]);
});