// An attempt to recreate Jared Tarbell's Sand.Stroke
// http://www.complexification.net/gallery/machines/sandstroke/

style = `html {
  background-color: #2E294E;
}

a {
  color: white;
}`;

var size = 600,
    numLines = 12,
    iterations = 7,
    iter = 0;

var colors = [];

var lines = [];

function init() {
  for (let i = 0; i < numLines; i++) {
    const y = random(size);

    lines[i] = sandstroke(
        createVector(0, y),
        createVector(size, y)
      )
      .color(random(colors));
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

  colors.forEach(c => c.setAlpha(16));

  init();
};

function draw() {
  for (let i = 0; i < numLines; i++) {
    lines[i]();
  }

  iter++;
  if (iter > iterations) noLoop();
};

function mouseClicked() {
  init();
  clear();
  loop();
}

function sandstroke(start, end) {
  var amplitude = 400,
      myColor = color(0, 0, 0, 16),
      grains = 200;

  function draw() {
    const vec = p5.Vector.sub(end, start),
          l = vec.mag();

    const originColor = color(myColor.toString("rgba"));
    originColor.setAlpha(alpha(myColor) * 3);

    // "sg" comes from Jared Tarbell's original Processing sketch. I'm not sure
    // what it means, but it is used in the sine function that spreads out the
    // "sand grains".
    let sg = random(0.01, 0.1);

    translate(start);
    rotate(vec.heading());

    for (let i = 0; i < l; i++) {
      const t = i / l,
            w = sg / grains,
            x = lerp(0, l, t),
            c = color(myColor.toString("rgba"));

      stroke(originColor);
      point(x, 0);

      for (let j = 0; j < grains; j++) {
        const y = amplitude * sin(j * w);

        c.setAlpha(255 * (0.1 - j / (grains * 10 + 10)));
        stroke(c);

        point(x, y);
        point(x, -y);
      }

      // Perturb sg so we get a different value out of our call to sin(). These
      // magic numbers come from Jared Tarbell's implementation.
      sg += random(-0.042, 0.042);

      // Clamp the value between [-0.3, 0.3]. Again the magic numbers are from
      // Tarbell.
      sg = min(max(-0.3, sg), 0.3);
    }
  }

  draw.amplitude = function(v) {
    if (arguments.length < 1) return amplitude;
    amplitude = v;
    return draw;
  };

  draw.color = function(v) {
    if (arguments.length < 1) return myColor;
    myColor = v;
    return draw;
  };

  draw.grains = function(v) {
    if (arguments.length < 1) return grains;
    grains = v;
    return draw;
  };

  return draw;
}
