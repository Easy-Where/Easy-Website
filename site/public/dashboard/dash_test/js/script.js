const body = document.querySelector("body")
const modeToggle = body.querySelector(".mode-toggle");
const img = document.querySelector("#Logo")
sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.toggle("dark");
}

modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
});

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
    sidebar.classList.toggle("close");
}

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
        img.src = 'assets/easy-ware-logotipo-close.png'
    } else {
        localStorage.setItem("status", "open");
        img.src = 'assets/easy-ware-logotipo-light.png'
    }
})

// teste de gráfico
var options = {
    chart: {
        type: 'area'
    },
    series: [{
        data: [[1324508400000, 34], [1324594800000, 54], [1326236400000, 43]]
    }],
    xaxis: {
        type: 'numeric'
    },
    responsive: [{
        breakpoint: undefined,
        options: {},
    }]

}

var chart = new ApexCharts(document.querySelector("#chart_cpu"), options);

chart.render();