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
function getChartColor(value) {
    if (value > 80) {
        return "#FF0000"; // vermelho
    } else if (value > 50) {
        return "#FFA500"; // laranja
    } else {
        return "#20E647"; // verde (cor original)
    }
}

var options = {
    chart: {
        height: 160,
        type: "radialBar",
    },

    series: [67],
    colors: [getChartColor(81)],
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
                    color: "#f1f1f1",
                    fontSize: "15px",
                    show: true
                }
            }
        }
    },
    stroke: {
        lineCap: "round"
    },
    labels: ["Progress"]
};

new ApexCharts(document.querySelector("#kpi_chart_cpu"), options).render();