window.onload = function() {
  gerarPainel()
};

const statusCores = {
  ideal: "#1175d1",
  alerta: "#f8f32b",
  ruim: "#de1a1a",
};

function gerarPainel() {
  const pid_user = sessionStorage.getItem('ID_USUARIO')
  const id_empresa = sessionStorage.getItem('ID_EMPRESA')
  console.log(id_empresa)
  fetch(`/maquinas/selectMaquinas/${id_empresa}`).then((resposta) => {
    if (resposta.ok) {
      resposta.json().then((ress)=>{
        
        for (let i = 0; i < 8; i++) {
          let icon = ""
          if (ress[i].so == "Windows") {
            icon = "uil-windows"
          } else if (ress[i].so == "Mac") {
            icon = "uil-apple"
          } else {
            icon = "uil-linux"
          }
        
  
          let status = ""
  
          if(ress[i].uso_cpu > 80){
            status = "ruim"
          }else if(ress[i].uso_cpu > 50){
            status = "alerta"
          }else{
            status = "ideal"
          }
          
          
  
          const statusCor = statusCores[status]
  
          painel_usuarios.innerHTML += `
            <a class="user_box" href="#" onclick="getMaquinas(${i})">
            <div class="total_box">
                <div class="sistema_operacional">
                    <i class="uil ${icon}"></i>
                </div>
                <div class="user_perfil">
                    <img src="assets/dinorock.jpg" alt="Foto de perfil do usuário">
                    <p>${ress[i].usuario}</p>
                </div>
                <div class="status" style="background-color: ${statusCor}"></div>
            </div>
            </a>`
        }
      })
    }
  })
}

// document.addEventListener("DOMContentLoaded", () => {
//   for (let [index, maquina] of maquinas.entries()) {
//     let icon = ""
//     if (maquina.so == "Windows") {
//       icon = "uil-windows"
//     } else if (maquina.so == "Mac") {
//       icon = "uil-apple"
//     } else {
//       icon = "uil-linux"
//     }

//     const statusCor = statusCores[maquina.status]

//     painel_usuarios.innerHTML += `
//         <a class="user_box" href="dashboardtecnico.html" onclick="getMaquinas(${index})">
//         <div class="total_box">
//             <div class="sistema_operacional">
//                 <i class="uil ${icon}"></i>
//             </div>
//             <div class="user_perfil">
//                 <img src="assets/dinorock.jpg" alt="Foto de perfil do usuário">
//                 <p>${maquina.nome_usuario}</p>
//             </div>
//             <div class="status" style="background-color: ${statusCor}"></div>
//         </div>
//         </a>`
//   }
// })

function getMaquinas(index) {
  // console.log(maquinas[index])

  // const maquina = maquinas[index]
  // localStorage.setItem('info_maquina', JSON.stringify(maquina))

  sessionStorage.setItem('ID_MAQUINA', index) ;
  window.location = "./dashboardtecnico.html"
}