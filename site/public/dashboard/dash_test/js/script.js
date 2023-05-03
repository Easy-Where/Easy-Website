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
        width: "100%",
        height: 380,
        type: "bar"
    },
    plotOptions: {
        bar: {
            horizontal: true
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 1,
        colors: ["#fff"]
    },
    series: [
        {
            data: [44, 55, 41, 64, 22, 43, 21]
        },
        {
            data: [53, 32, 33, 52, 13, 44, 32]
        }
    ],
    xaxis: {
        categories: [
            "Korea",
            "Canada",
            "Poland",
            "Italy",
            "France",
            "Japan",
            "China"
        ]
    },
    legend: {
        position: "right",
        verticalAlign: "top",
        containerMargin: {
            left: 35,
            right: 60
        }
    },
    responsive: [
        {
            breakpoint: 1000,
            options: {
                plotOptions: {
                    bar: {
                        horizontal: false
                    }
                },
                legend: {
                    position: "bottom"
                }
            }
        }
    ]
};

var chart = new ApexCharts(
    document.querySelector("#responsive-chart"),
    options
);

chart.render();


//kpi teste
var options = {
    chart: {
        type: "radialBar",
    },

    series: [15],
    colors: ["#20E647"],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: "75%",
                background: "#000"
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
                    offsetY: -10,
                    color: "#fff",
                    fontSize: "13px"
                },
                value: {
                    color: "#fff",
                    fontSize: "30px",
                    show: true
                }
            }
        }
    },
    fill: {
        type: "gradient",
        gradient: {
            shade: "dark",
            type: "vertical",
            gradientToColors: ["#87D4F9"],
            stops: [0, 100]
        }
    },
    stroke: {
        lineCap: "round"
    },
    labels: ["Progress"]
};

var chart = new ApexCharts(document.querySelector("#kpi_chart_cpu"), options);

chart.render();
