var size = 600,
    nCircles = 13,
    radius = size / 3;

var palette = [
  "#08415C",
  "#F4F0BB",
  "#81726A",
  "#3B0D11",
  "#EDD4B2",

  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#000000",
  "#000000",
  "#000000",
];

var circles = new Array(nCircles);

function setup() {
  palette = palette.map(c => color(c));
  createCanvas(size, size);
  init();
}

function draw() {
  for (let i = 0; i < nCircles; i++) {
    circles[i]();
  }
}

function mouseClicked() {
  clear();
  init();
}

function init() {
  for (let i = 0; i < nCircles; i++) {
    circles[i] = sandCircle(random(palette));
  }
}

function sandCircle(myColor) {
  const borderAlpha = 16,
        grains = 200;

  let cx, cy, r, l, jiggle;

  let _i;

  function init() {
    cx = random(size);
    cy = random(size);
    r = random(radius * 0.5, radius);
    l = TAU * r;
    jiggle = random(-0.1, 0.1);

    _i = 0;
  }

  function next() {
    const theta = lerp(0, TAU, _i / l),
          wiggle = jiggle / grains;

    push();
    translate(cx, cy);
    rotate(theta);

    myColor.setAlpha(borderAlpha);
    stroke(myColor);
    point(r, 0);

    for (let j = 0; j < grains; j++) {
      const amp = r * Math.abs(Math.sin(j * wiggle)) * 3;

      myColor.setAlpha(255 * (0.1 - (j / (grains * 10 + 10))));
      stroke(myColor);

      point(r - amp, 0);
    }

    // Perturb our perturbation a little
    jiggle += random(-0.05, 0.05);
    jiggle = Math.min(0.3, Math.max(-0.3, jiggle));

    _i++;
    if (_i > l) _i = 0;

    if (random(10000) > 9990) myColor = random(palette);

    pop();
  }

  init();

  return next;
}
