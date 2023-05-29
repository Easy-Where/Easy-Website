const maquinas = [
    { so: "Windows", imagem_usuario: "../assets/dinorock.jpg", nome_usuario: "Paulo Alvares", status: "ideal" },
    //{ so: "Mac", imagem_usuario: "../assets/dinorock.jpg", nome_usuario: "Ruan Rodrigues", status: "ruim" },
    //{ so: "Windows", imagem_usuario: "../assets/dinorock.jpg", nome_usuario: "Vini Cu", status: "ideal" },
    { so: "Linux", imagem_usuario: "../assets/dinorock.jpg", nome_usuario: "Landucci Big", status: "alerta" },
    { so: "Linux", imagem_usuario: "../assets/dinorock.jpg", nome_usuario: "Tomas Turbando", status: "alerta" },
    { so: "Windows", imagem_usuario: "../assets/dinorock.jpg", nome_usuario: "Diego Vieira", status: "ruim" },
    { so: "Linux", imagem_usuario: "../assets/dinorock.jpg", nome_usuario: "Augusto César", status: "alerta" },
    { so: "Mac", imagem_usuario: "../assets/dinorock.jpg", nome_usuario: "Duda Wanda", status: "ruim" },
    { so: "Windows", imagem_usuario: "../assets/dinorock.jpg", nome_usuario: "Bruno Pimentel", status: "alerta" },
    { so: "Linux", imagem_usuario: "../assets/dinorock.jpg", nome_usuario: "Marquito Henrique", status: "ideal" },
    { so: "Linux", imagem_usuario: "../assets/dinorock.jpg", nome_usuario: "Deyde Costa", status: "ideal" },
    
]

function painel(){
    const pid_user = sessionStorage.getItem('ID_USUARIO')

    fetch(`/usuarios/painel/${pid_user}`).then((resposta)=>{
        if(resposta.ok){
            console.log(resposta)

            for(let i = 0; i < resposta.length; i++){
                let icon = ""
                if (resposta[i].so == "Windows") {
                    icon = "uil-windows"
                } else if (resposta[i].so == "Mac") {
                    icon = "uil-apple"
                } else {
                    icon = "uil-linux"
                }
            }

            let status = ""

            const statusCor = statusCores[status]

            painel_usuarios.innerHTML += `
            <a class="user_box" href="dashboardtecnico.html" onclick="getMaquinas(${resposta[i].pid})">
            <div class="total_box">
                <div class="sistema_operacional">
                    <i class="uil ${icon}"></i>
                </div>
                <div class="user_perfil">
                    <img src="assets/dinorock.jpg" alt="Foto de perfil do usuário">
                    <p>${resposta[i].nome_usuario}</p>
                </div>
                <div class="status" style="background-color: ${statusCor}"></div>
            </div>
            </a>`

        }
    })
}

const statusCores = {
    ideal: "#1175d1",
    alerta: "#f8f32b",
    ruim: "#de1a1a",
};

document.addEventListener("DOMContentLoaded", () => {
    for (let [index, maquina] of maquinas.entries()) {
        let icon = ""
        if (maquina.so == "Windows") {
            icon = "uil-windows"
        } else if (maquina.so == "Mac") {
            icon = "uil-apple"
        } else {
            icon = "uil-linux"
        }
        
        const statusCor = statusCores[maquina.status]

        painel_usuarios.innerHTML += `
        <a class="user_box" href="dashboardtecnico.html" onclick="getMaquinas(${index})">
        <div class="total_box">
            <div class="sistema_operacional">
                <i class="uil ${icon}"></i>
            </div>
            <div class="user_perfil">
                <img src="assets/dinorock.jpg" alt="Foto de perfil do usuário">
                <p>${maquina.nome_usuario}</p>
            </div>
            <div class="status" style="background-color: ${statusCor}"></div>
        </div>
        </a>`
    }
})

function getMaquinas(index){
    console.log(maquinas[index])

    const maquina = maquinas[index]
    // localStorage.setItem('info_maquina', JSON.stringify(maquina))
}