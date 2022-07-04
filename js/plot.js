let url1  = 'https://site51.webte.fei.stuba.sk/zaverecne/OctaveGeneratedFiles/xyt.json';

function plotDataChart() {

    fetch(url1)
        .then(res => res.json())
        .then((out) => {
            GRAPH = document.getElementById("graphDiv");
            x1 = []
            x3 = []
            var frames = []

            for(let i = 0; i < out.data[0].length; i++) {
                x1.push(out.data[0][i][1])
                x3.push(out.data[0][i][3])
            }

            var data = [
                // {
                //     x: out.data[2],
                //     y: out.data[1],
                //     line:
                //         {
                //             width: 3,
                //             shape: "spline",
                //             color: "#1E90FF"
                //         },
                //     visible: true
                // },
                {
                    x: out.data[2],
                    y: x1,
                    mode: 'lines',
                    name: "car",
                    line:
                        {
                            width: 4,
                            shape: "spline",
                            color: "#90ee90"
                        },
                    visible: true
                },
                {
                    x: out.data[2],
                    y: x3,
                    mode: 'lines',
                    name: "wheel",
                    line:
                        {
                            width: 4,
                            shape: "spline",
                            color: "#008080"
                        },
                    visible: true
                },
            ]

            let config = {
                responsive: true,
                maintainAspectRation: true,
                resizeDelay: 0,
                scrollZoom: false,
                displayModeBar: false
            };

            var layout = {
                title: '',
                showlegend: true,
                width: 450,
                height: 300,
                font: {
                    family: "Nanum  Gothic",
                    size: 16
                },
                xaxis: {
                    title: 't[s]',
                    showgrid: true,
                    zeroline: true
                },
                yaxis: {
                    title: 'x[m]',
                    showline: true
                },

            };

            var n = out.data[2].length;
            for (var i = 0; i < n; i++) {
                frames[i] = {data: [{x: [], y: []}, {x: [], y: []}]}
                frames[i].data[0].x = out.data[2].slice(0, i+1);
                frames[i].data[0].y = x1.slice(0, i+1);
                frames[i].data[1].x = out.data[2].slice(0, i+1);
                frames[i].data[1].y = x3.slice(0, i+1);
            }

            Plotly.newPlot(GRAPH, data, layout, config)

            Plotly.animate(GRAPH, frames, {
                transition: {
                    duration: 0,
                    easing: 'linear'
                },
                frame: {
                    duration: 1,
                    redraw: false,
                },
            });

            setInterval(function() {
                Plotly.animate(GRAPH, frames, {
                    transition: {
                        duration: 0,
                        easing: 'linear'
                    },
                    frame: {
                        duration: 1,
                        redraw: false,
                    },
                });
            },5000)

        })
        .catch(err => { throw err });
}