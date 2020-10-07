const size = 600,
      n = 13,
      stop = 100000;

let iter = 0;

function sketch(p) {
  let walkers = new Array(n),
      moves = [
        p.createVector(1, 0),
        p.createVector(0, 1),
        p.createVector(0, 0),
        p.createVector(0, -1),
        p.createVector(-1, 0)
      ];

  function init() {
    for (let i = 0; i < n; i++) {
      walkers[i] = p.createVector(p.random(size), p.random(size));
    }
  }

  p.setup = function() {
    p.createCanvas(size, size);
    init();
  };

  p.draw = function () {
    p.stroke(0, 0, 0, 16);

    for (let i = 0; i < n; i++) {
      p.point(walkers[i]);
      walkers[i].add(p.random(moves));
    }

    if (iter >= stop) p.noLoop();
    iter++;
  };

  p.mouseClicked = function () {
    init();
    p.clear();
    p.loop();
  };
}

new p5(sketch);
