const width = 400;                  // Width of the canvas
const height = 300;                 // Height of the canvas
let url  = 'https://site51.webte.fei.stuba.sk/zaverecne/OctaveGeneratedFiles/xyt.json';

// Draw
const draw = SVG()
    .addTo("#animDiv")
    .size(width + 60, height)
    .viewbox(0, 0, width + 60, height)

let canvas = draw.group();

// Elements
let lines = [];
let upperLine;
let m1;
let m2;
let m1Text;
let m2Text;

drawCanvas(canvas);
drawMovable(canvas);

// Draw default state
function drawCanvas(canvas) {

    // Lines
    canvas.polyline('10, 10 10, 255 450, 255').fill('none').stroke({color: 'black', width: 2});
    canvas.polyline('444, 249 450, 255 444, 261').fill('none').stroke({color: 'black', width: 2});
    canvas.polyline('50, 250 50, 260').fill('none').stroke({color: 'black', width: 2});
    canvas.polyline('90, 250 90, 260').fill('none').stroke({color: 'black', width: 2});
    canvas.polyline('130, 250 130, 260').fill('none').stroke({color: 'black', width: 2});
    canvas.polyline('170, 250 170, 260').fill('none').stroke({color: 'black', width: 2});
    canvas.polyline('210, 250 210, 260').fill('none').stroke({color: 'black', width: 2});
    canvas.polyline('250, 250 250, 260').fill('none').stroke({color: 'black', width: 2});
    canvas.polyline('290, 250 290, 260').fill('none').stroke({color: 'black', width: 2});
    canvas.polyline('330, 250 330, 260').fill('none').stroke({color: 'black', width: 2});
    canvas.polyline('370, 250 370, 260').fill('none').stroke({color: 'black', width: 2});

    // Text
    canvas.text("1").move(45, 285).font({size: 20});
    canvas.text("2").move(85, 285).font({size: 20});
    canvas.text("3").move(125, 285).font({size: 20});
    canvas.text("4").move(165, 285).font({size: 20});
    canvas.text("5").move(205, 285).font({size: 20});
    canvas.text("6").move(245, 285).font({size: 20});
    canvas.text("7").move(285, 285).font({size: 20});
    canvas.text("8").move(325, 285).font({size: 20});
    canvas.text("9").move(365, 285).font({size: 20});
    canvas.text("[m]").move(410, 275).font({size: 20});
}

function drawMovable(canvas) {

    // Whole line
    lines.push(canvas.polyline('10, 120 20, 100 30, 120 40, 100 50, 120 60, 100 70, 120 80, 100' +
        ' 90, 120 100, 100 110, 120 120, 100 130, 120').fill('none').stroke({color: 'black', width: 2}));
    lines.push(canvas.polyline('170, 120 180, 100 190, 120 200, 100 210, 120 220, 100 230, 120 240, 100 250, 120')
        .fill('none').stroke({color: 'black', width: 2}));

    // Upper line
    upperLine = canvas.polyline('10, 80 250, 80').fill('none').stroke({color: 'black', width: 2});

    // Masses
    m1 = canvas.rect(40, 60)
        .move(130, 70)
        .fill("#5a52c9")
        .stroke({ width: 2, color: 'black' })
    m2 = canvas.rect(40, 60)
        .move(250, 70)
        .fill("#cc2a2a")
        .stroke({ width: 2, color: 'black' })
    m1Text = canvas.text("m1").move(140, 110).font({size: 20}).fill("white");
    m2Text = canvas.text("m2").move(260, 110).font({size: 20}).fill("white");
}

animation();

function animation() {
    // Fetch data from Octave
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            let x1 = [];
            let x2 = [];
            for(let i = 0; i < out.data[0].length; i++) {
                x1.push(out.data[0][i][1])
                x2.push(out.data[0][i][3])
            }

            // Create path for m1 and m2
            let xValues = [];
            let yValues = [];

            for(let i = 1; i < x1.length; i++) {
                xValues.push(130 + 25 * x1[i]);
                yValues.push(250 + 25 * x2[i]);
            }

            // Animate
            for(let j = 0; j < xValues.length; j++) {
                let block1 = xValues[j] / 12;
                let block2 = (yValues[j] - (xValues[j] + 40)) / 8;

                m1.animate({duration: 10}).move(xValues[j], 70);
                m1Text.animate({duration: 10}).move(xValues[j] + 10, 100);
                m2.animate({duration: 10}).move(yValues[j], 70);
                m2Text.animate({duration: 10}).move(yValues[j] + 10, 100);
                upperLine.animate(10).plot([[10, 80], [yValues[j], 80]]);
                lines[0].animate(10)
                    .plot([[10, 120], [block1 + 10, 100], [block1 * 2 + 10, 120], [block1 * 3 + 10, 100],
                        [block1 * 4 + 10, 120], [block1 * 5 + 10, 100], [block1 * 6 + 10, 120],
                        [block1 * 7 + 10, 100], [block1 * 8 + 10, 120], [block1 * 9 + 10, 100],
                        [block1 * 10 + 10, 120], [block1 * 11 + 10, 100], [xValues[j], 120]]);
                lines[1].animate(10)
                    .plot([[xValues[j] + 40, 120], [block2 + xValues[j] + 40, 100],
                        [block2 * 2 + xValues[j] + 40, 120], [block2 * 3 + xValues[j] + 40, 100],
                        [block2 * 4 + xValues[j] + 40, 120], [block2 * 5 + xValues[j] + 40, 100],
                        [block2 * 6 + xValues[j] + 40, 120], [block2 * 7 + xValues[j] + 40, 100], [yValues[j], 120]]);
            }

            setInterval(function() {
            for(let j = 0; j < xValues.length; j++) {
                let block1 = xValues[j] / 12;
                let block2 = (yValues[j] - (xValues[j] + 40)) / 8;

                m1.animate({duration: 10}).move(xValues[j], 70);
                m1Text.animate({duration: 10}).move(xValues[j] + 10, 100);
                m2.animate({duration: 10}).move(yValues[j], 70);
                m2Text.animate({duration: 10}).move(yValues[j] + 10, 100);
                upperLine.animate(10).plot([[10, 80], [yValues[j], 80]]);
                lines[0].animate(10)
                    .plot([[10, 120], [block1 + 10, 100], [block1 * 2 + 10, 120], [block1 * 3 + 10, 100],
                          [block1 * 4 + 10, 120], [block1 * 5 + 10, 100], [block1 * 6 + 10, 120],
                          [block1 * 7 + 10, 100], [block1 * 8 + 10, 120], [block1 * 9 + 10, 100],
                          [block1 * 10 + 10, 120], [block1 * 11 + 10, 100], [xValues[j], 120]]);
                lines[1].animate(10)
                    .plot([[xValues[j] + 40, 120], [block2 + xValues[j] + 40, 100],
                        [block2 * 2 + xValues[j] + 40, 120], [block2 * 3 + xValues[j] + 40, 100],
                        [block2 * 4 + xValues[j] + 40, 120], [block2 * 5 + xValues[j] + 40, 100],
                        [block2 * 6 + xValues[j] + 40, 120], [block2 * 7 + xValues[j] + 40, 100], [yValues[j], 120]]);
            }}, 5000);

        })
        .catch(err => { throw err });
}