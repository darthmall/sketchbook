var size = 600,
    n = 13,
    stop = 100000;

var iter = 0;

var walkers = new Array(n),
    moves = [];

function init() {
  for (let i = 0; i < n; i++) {
    walkers[i] = createVector(random(size), random(size));
  }
}

function setup() {
  createCanvas(size, size);

  moves = [
    createVector(1, 0),
    createVector(0, 1),
    createVector(0, 0),
    createVector(0, -1),
    createVector(-1, 0)
  ];

  init();
};

function draw() {
  stroke(0, 0, 0, 16);

  for (let i = 0; i < n; i++) {
    point(walkers[i]);
    walkers[i].add(random(moves));
  }

  if (iter >= stop) noLoop();
  iter++;
};

function mouseClicked() {
  init();
  clear();
  loop();
};
