const usuarios = [
    { id: "1", nome: "Paulo Alvares", funcao: "Técnico", email: "pauloalvares66@gmail.com", teste: "22 Out 2023", gestor: "Lindomar Silva", status: "ideal" },
    { id: "2", nome: "Diego Vieira", funcao: "Vendedor", email: "diegovieira123@gmail.com", teste: "21 Dez 2023", gestor: "Lindomar Silva", status: "alerta" },
    { id: "3", nome: "Fernanda Caramico", funcao: "Gestor", email: "caramicoSptech@gmail.com", teste: "22 Out 2023", gestor: "NULL", status: "ruim" },
    { id: "4", nome: "Maria Eduarda", funcao: "Técnico", email: "dudinhagameplays@gmail.com", teste: "22 Out 2023", gestor: "Fernanda Caramico", status: "ideal" },
    { id: "5", nome: "Marcos Augusto", funcao: "Gestor", email: "marcosaugustinho@gmail.com", teste: "22 Out 2023", gestor: "Paulo Alvares", status: "ideal" },
    { id: "6", nome: "Bruno Pimentel", funcao: "Gestor", email: "pimentelbru@gmail.com", teste: "22 Out 2023", gestor: "NULL", status: "alerta" },
]

const statusCores = {
    ideal: "#1175d1",
    alerta: "#f8f32b",
    ruim: "#de1a1a",
};

document.addEventListener("DOMContentLoaded", () => {
    for (let [index, usuario] of usuarios.entries()) {
        const statusCor = statusCores[usuario.status]

        tabela.innerHTML += `
        <tr onclick="getUsuarios(${index})">
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.funcao}</td>
            <td>${usuario.email}</td>
            <td>${usuario.teste}</td>
            <td>${usuario.gestor}</td>
            <td class="ultimo"><div class="status" style="background-color: ${statusCor}"></div></td>
        </tr>`
    }
})

function getUsuarios(index) {
    console.log(usuarios[index])

    const usuario = usuarios[index]
    localStorage.setItem('info_usuario', JSON.stringify(usuario))
}