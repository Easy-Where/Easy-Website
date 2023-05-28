// const statusCores = {
//     ideal: "#1175d1",
//     alerta: "#f8f32b",
//     ruim: "#de1a1a",
// };
// const statusCor = statusCores.alerta


//Selecionar funcionários
document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch(`/usuarios/selectFuncionarios/${pidUsado}`);
      
      const funcionarios = await response.json();
      funcionarios.forEach((work) => {
        tabela.innerHTML += `
        <tr>
            <td>${work.pid}</td>
            <td>${work.nome}</td>
            <td>${work.cargo}</td>
            <td>${work.email}</td>
            <td>${work.telefone}</td>
            <td class="ultimo"><div class="status" style="background-color: red"></div></td>
        </tr>`;
        
      });
    } catch (error) {
      console.log(error);
    }
  });

// const usuarios = [
//     { id: "1", nome: "Paulo Alvares", cargo: "Técnico", email: "pauloalvares66@gmail.com", telefone: "22 Out 2023", status: "ideal" },
//     { id: "2", nome: "Diego Vieira", cargo: "Vendedor", email: "diegovieira123@gmail.com", telefone: "21 Dez 2023", status: "alerta" },
//     { id: "3", nome: "Fernanda Caramico", cargo: "Gestor", email: "caramicoSptech@gmail.com", telefone: "22 Out 2023", status: "ruim" },
//     { id: "4", nome: "Maria Eduarda", cargo: "Técnico", email: "dudinhagameplays@gmail.com", telefone: "22 Out 2023", status: "ideal" },
//     { id: "5", nome: "Marcos Augusto", cargo: "Gestor", email: "marcosaugustinho@gmail.com", telefone: "22 Out 2023", status: "ideal" },
//     { id: "6", nome: "Bruno Pimentel", cargo: "Gestor", email: "pimentelbru@gmail.com", telefone: "22 Out 2023", status: "alerta" },
// ]

// document.addEventListener("DOMContentLoaded", () => {
//     for (let [index, usuario] of usuarios.entries()) {
//         const statusCor = statusCores[usuario.status]

//         tabela.innerHTML += `
//         <tr onclick="getUsuarios(${index})">
//             <td>${usuario.id}</td>
//             <td>${usuario.nome}</td>
//             <td>${usuario.cargo}</td>
//             <td>${usuario.email}</td>
//             <td>${usuario.telefone}</td>
//             <td class="ultimo"><div class="status" style="background-color: ${statusCor}"></div></td>
//         </tr>`
//     }
// })

// function getUsuarios(index) {
//     console.log(usuarios[index])

//     const usuario = usuarios[index]
//     localStorage.setItem('info_usuario', JSON.stringify(usuario))
// }

// KPI da CPU
function getChartColor(value) {
    if (value >= 80) {
        return "#de1a1a"; // vermelho
    } else if (value >= 50) {
        return "#f8f32b"; // amarelo
    } else {
        return "#1175d1"; // azul (cor original)
    }
}

var geral = {
    chart: {
        offsetY: 0,
        offsetX: 0,
        height: 260,
        type: "radialBar",
    },
    series: [50],
    colors: [getChartColor(50)],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: "60%",
            },
            track: {
                dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 0,
                    blur: 4,
                    opacity: 0.15
                }
            },
            dataLabels: {
                name: {
                    show: false
                },
                value: {
                    offsetY: 8,
                    color: "#f1f1f1",
                    fontSize: "20px",
                    show: true,
                    fontFamily: "Montserrat"
                }
            }
        }
    },
    stroke: {
        lineCap: "round"
    },
    labels: ["Progress"]
};

new ApexCharts(document.querySelector("#chart_total"), geral).render();