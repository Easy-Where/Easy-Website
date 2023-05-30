// Exibir e definir informações do usuário
const emailUsuario = sessionStorage.getItem("emailUser");
const senhaUsuario = sessionStorage.getItem("senhaUser");
let pidUsado = 0;
let usuarios = [{}];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`/usuarios/exibirPIDUsuario/${emailUsuario}/${senhaUsuario}`);

    const dataUser = await response.json();

    dataUser.forEach((user) => {
      puxarNome.innerHTML = user.nome;
      pidUsado = user.pid;
      selectFuncionarios();
    });
  } catch (error) {
    console.log(error);
  }
});

//Selecionar funcionários
async function selectFuncionarios() {
  try {
    const objetoFuncionario = await fetch(`/usuarios/selectFuncionarios/${pidUsado}`);
    
    const funcionarios = await objetoFuncionario.json();

    funcionarios.slice(1).forEach((funcionario) => {
      tabela.innerHTML += `
        <tr onclick="getUsuarios(${funcionario.id})">
            <td>${funcionario.pid}</td>
            <td>${funcionario.nome}</td>
            <td>${funcionario.cargo}</td>
            <td>${funcionario.email}</td>
            <td>${funcionario.telefone}</td>
            <td class="ultimo"><div class="status" style="background-color: ${statusCor}"></div></td>
        </tr>`;
    });
  } catch (error) {
    console.log(error);
  }
}

const statusCores = {
  ideal: "#1175d1",
  alerta: "#f8f32b",
  ruim: "#de1a1a",
};
const statusCor = usuarios.status;

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
          opacity: 0.15,
        },
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: 8,
          color: "#f1f1f1",
          fontSize: "20px",
          show: true,
          fontFamily: "Montserrat",
        },
      },
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Progress"],
};

new ApexCharts(document.querySelector("#chart_total"), geral).render();
