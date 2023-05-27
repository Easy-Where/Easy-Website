const maquina = JSON.parse(localStorage.getItem('info_maquina'))
console.log(maquina.nome_usuario)
nomeDoUsuario.innerHTML = maquina.nome_usuario

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

var options = {
    chart: {
        offsetY: 0,
        offsetX: 0,
        height: 160,
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

new ApexCharts(document.querySelector("#kpi_chart_cpu"), options).render();

const barraDeTemperatura = document.getElementById("barra-de-temperatura-cpu");
let valorAtual1 = 0;

setInterval(() => {
    valorAtual1 += 10;
    barraDeTemperatura.value = valorAtual1;

    if (valorAtual1 === 100) {
        clearInterval(intervalId);
    }
}, 1000);

const barraDeClock = document.getElementById("barra-de-clock-cpu");
let valorAtual2 = 0;

setInterval(() => {
    valorAtual2 += 10;
    barraDeClock.value = valorAtual2;

    if (valorAtual2 === 100) {
        clearInterval(intervalId);
    }
}, 1000);

// KPI da RAM
var options3 = {
    chart: {
        offsetY: 0,
        offsetX: 0,
        height: 160,
        type: "radialBar",
    },
    series: [10],
    colors: [getChartColor(10)],
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

new ApexCharts(document.querySelector("#kpi_chart_ram"), options3).render();

// KPI do disco
var options4 = {
    chart: {
        offsetY: 0,
        offsetX: 0,
        height: 160,
        type: "radialBar",
    },
    series: [10],
    colors: [getChartColor(10)],
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

new ApexCharts(document.querySelector("#kpi_chart_disco"), options4).render();

//Gráfico CPU
var options4 = {
    chart: {
        id: "chart2",
        type: "area",
        height: 200,
        foreColor: "#f1f1f1",
        animations: {
            initialAnimation: {
                enabled: false
            }
        }
    },
    colors: ["#1175d1"],
    stroke: {
        width: 3
    },
    grid: {
        borderColor: "#252525",
        // clipMarkers: false,
        yaxis: {
            lines: {
                show: false
            }
        }
    },
    dataLabels: {
        enabled: false
    },
    fill: {
        gradient: {
            enabled: true,
            opacityFrom: 1,
            opacityTo: 0
        }
    },
    markers: {
        size: 6,
        colors: ["#000524"],
        strokeColor: "#1175d1",
        strokeWidth: 3
    },
    series: [
        // {
        //     data: data
        // }
        {
            name: "Uso",
            data: [
                [1486684800000, 34],
                [1486771200000, 43],
                [1486857600000, 31],
                [1486944000000, 43],
                [1487030400000, 33],
                [1487116800000, 52]
            ]
        }
    ],
    tooltip: {
        theme: "dark"
    },
    xaxis: {
        type: "datetime"
    },
    yaxis: {
        min: 0,
        tickAmount: 5
    }
};

new ApexCharts(document.querySelector("#chart_cpu"), options4).render();

// Gráfico RAM
var options5 = {
    chart: {
        id: "chart2",
        type: "area",
        height: 200,
        foreColor: "#f1f1f1",
        animations: {
            initialAnimation: {
                enabled: false
            }
        }
    },
    colors: ["#1175d1"],
    stroke: {
        width: 3
    },
    grid: {
        borderColor: "#252525",
        // clipMarkers: false,
        yaxis: {
            lines: {
                show: false
            }
        }
    },
    dataLabels: {
        enabled: false
    },
    fill: {
        gradient: {
            enabled: true,
            opacityFrom: 1,
            opacityTo: 0
        }
    },
    markers: {
        size: 6,
        colors: ["#000524"],
        strokeColor: "#1175d1",
        strokeWidth: 3
    },
    series: [
        // {
        //     data: data
        // }
        {
            name: "Uso",
            data: [
                [1486684800000, 34],
                [1486771200000, 43],
                [1486857600000, 31],
                [1486944000000, 43],
                [1487030400000, 33],
                [1487116800000, 52]
            ]
        }
    ],
    tooltip: {
        theme: "dark"
    },
    xaxis: {
        type: "datetime"
    },
    yaxis: {
        min: 0,
        tickAmount: 5
    }
};

new ApexCharts(document.querySelector("#chart_ram"), options5).render();

// Gráfico Disco
var options6 = {
    chart: {
        id: "chart2",
        type: "area",
        height: 200,
        foreColor: "#f1f1f1",
        animations: {
            initialAnimation: {
                enabled: false
            }
        }
    },
    colors: ["#1175d1"],
    stroke: {
        width: 3
    },
    grid: {
        borderColor: "#252525",
        // clipMarkers: false,
        yaxis: {
            lines: {
                show: false
            }
        }
    },
    dataLabels: {
        enabled: false
    },
    fill: {
        gradient: {
            enabled: true,
            opacityFrom: 1,
            opacityTo: 0
        }
    },
    markers: {
        size: 6,
        colors: ["#000524"],
        strokeColor: "#1175d1",
        strokeWidth: 3
    },
    series: [
        {
            name: "Uso",
            data: [
                [1486684800000, 34],
                [1486771200000, 43],
                [1486857600000, 31],
                [1486944000000, 43],
                [1487030400000, 33],
                [1487116800000, 52]
            ]
        }
    ],
    tooltip: {
        theme: "dark"
    },
    xaxis: {
        type: "datetime"
    },
    yaxis: {
        min: 0,
        tickAmount: 5
    }
};

var chart = new ApexCharts(document.querySelector("#chart_disco"), options6).render();

// Gráfico Rede
var options7 = {
    series: [{
        name: 'Download',
        type: 'area',
        data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33],
        color: "#1175d1",
    }, {
        name: 'Upload',
        type: 'line',
        data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43],
        color: "#a9c7f1"
    }],
    chart: {
        type: 'area',
        height: 200,
        foreColor: "#f1f1f1",
        animations: {
            initialAnimation: {
                enabled: false
            }
        }
    },
    grid: {
        borderColor: "#252525",
        yaxis: {
            lines: {
                show: false
            }
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 3
    },
    fill: {
        type: 'solid',
        opacity: [0.35, 1],
        gradient: {
            enabled: true,
            opacityFrom: 1,
            opacityTo: 0
        }
    },
    labels: ['Dec 01', 'Dec 02', 'Dec 03', 'Dec 04', 'Dec 05', 'Dec 06', 'Dec 07', 'Dec 08', 'Dec 09 ', 'Dec 10', 'Dec 11'],
    markers: {
        size: 6,
        colors: ["#000524"],
        strokeColor: "#1175d1",
        strokeWidth: 3
    },
    tooltip: {
        theme: "dark"
    },
    xaxis: {
        type: "datetime"
    },
    yaxis: [
        {
            min: 0,
            tickAmount: 5
        },
    ]
};

new ApexCharts(document.querySelector("#chart_rede"), options7).render();

var data = generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
    min: 30,
    max: 90
});

function generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = baseval;
        var y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([x, y]);
        baseval += 86400000;
        i++;
    }
    return series;
}