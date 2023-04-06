// Ver senha
const input = document.querySelector("#senha");
const img = document.querySelector("#trocarFigura");
img.addEventListener('click', togglePass);

function togglePass() {
    if (input.type == "password") {
        input.type = "text";
        img.src = 'assets/conectar-escondersenha.png'
    } else {
        input.type = "password";
        img.src = 'assets/conectar-versenha.png'
    }
}
