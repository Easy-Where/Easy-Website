const body = document.querySelector("body");
const modeToggle = body.querySelector(".mode-toggle");
const img = document.querySelector("#Logo");
const sidebar = body.querySelector("nav");
const sidebarToggle = body.querySelector(".sidebar-toggle");

modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
        if (sidebar.classList.contains("close")) {
            img.src = 'assets/easy-ware-logotipo-close.png'
        } else {
            img.src = 'assets/easy-ware-logotipo-light.png'
        }
    } else {
        localStorage.setItem("mode", "light");
        if (sidebar.classList.contains("close")) {
            img.src = 'assets/easy-ware-logotipo-close-dark.png'
        } else {
            img.src = 'assets/easy-ware-logotipo-dark.png'
        }
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
        if (body.classList.contains("dark")) {
            img.src = 'assets/easy-ware-logotipo-close.png'
        } else {
            img.src = 'assets/easy-ware-logotipo-close-dark.png'
        }
    } else {
        localStorage.setItem("status", "open");
        if (body.classList.contains("dark")) {
            img.src = 'assets/easy-ware-logotipo-light.png'
        } else {
            img.src = 'assets/easy-ware-logotipo-dark.png'
        }
    }
})

// teste de gráfico
var options = {
    chart: {
        type: 'bar'
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