// An attempt to recreate Jared Tarbell's Sand.Stroke
// http://www.complexification.net/gallery/machines/sandstroke/

style = `html {
  background-color: #2E294E;
}

a {
  color: white;
}`;

var size = 600;

var colors = [];

var numLines = 12;

var lines = [];

function init() {
  for (let i = 0; i < numLines; i++) {
    lines[i] = [random(size), random(colors)];
  }
}

function setup() {
  Sketch.createStyle(style);

  createCanvas(size, size);

  colors = [
    color("#FFF2F1"),
    color("#107E7D"),
    color("#D1495B"),
    color("#FFD400")
  ];

  init();
  noLoop();
};

function draw() {
  for (let i = 0; i < numLines; i++) {
    const [y, c] = lines[i];
    stroke(red(c), green(c), blue(c), 255);
    line(0, y, size, y);
  }
};
