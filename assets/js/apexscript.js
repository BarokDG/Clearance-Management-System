var options = {
    chart: {
        type: 'bar'
    },
    series: [{
        name: 'sales',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 25]
    }],
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
}

var optionsPie = {
    chart: {
        type: 'pie'
    },
    series: [44, 55, 13, 33],
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
}

var optionsStatus = {
    chart: {
        height: 280,
        type: "radialBar",
    },

    series: [67],
    colors: ["#20E647"],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: "70%",
                background: "#293450"
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

var options1 = {
    chart: {
        height: 280,
        type: "radialBar",
    },
    series: [67, 84, 20, 61],
    plotOptions: {
        radialBar: {
            dataLabels: {
                total: {
                    show: true,
                    label: 'TOTAL'
                }
            }
        }
    },
    labels: ['Library', 'Dorm', 'Department', 'Sport Master']
};



const chart = new ApexCharts(document.querySelector("#chart"), options);
const radialBar = new ApexCharts(document.querySelector("#radial_bar"), options1);

const pieChart = new ApexCharts(document.querySelector("#pieChart"), optionsPie);
const pieChart2 = new ApexCharts(document.querySelector("#pieChart2"), optionsPie);
const pieChart3 = new ApexCharts(document.querySelector("#pieChart3"), optionsPie);

const statusBar = new ApexCharts(document.querySelector('#statusbar'), optionsStatus);
// const statusBar2 = new ApexCharts(document.querySelector('#statusbar2'), optionsStatus);
// const statusBar3 = new ApexCharts(document.querySelector('#statusbar3'), optionsStatus);
// const statusBar4 = new ApexCharts(document.querySelector('#statusbar4'), optionsStatus);

chart.render();
radialBar.render();

pieChart.render();
pieChart2.render();
pieChart3.render();

statusBar.render();
// statusBar2.render();
// statusBar3.render();
// statusBar4.render();