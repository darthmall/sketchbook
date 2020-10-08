// An attempt to recreate Jared Tarbell's Sand.Stroke
// http://www.complexification.net/gallery/machines/sandstroke/

var style = `html {
  background-color: #2E294E;
}

a {
  color: white;
}`;

var size = 1600,
    numLines = 9;

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

  const renderer = createCanvas(size, size);

  renderer.canvas.style.maxHeight = "75vh";
  renderer.canvas.style.maxWidth = "75vw";

  colors = [
    color("#FFF2F1"),
    color("#107E7D"),
    color("#D1495B"),

    // Padding background and foreground colors to increase the likelihood that
    // a sand stroke will end up with one of these colors. This softens the
    // effect of the visual.
    color("#FFD400"),
    color("#FFD400"),
    color("#FFD400"),
    color("#FFD400"),
    color("#FFD400"),
    color("#FFD400"),

    color("#2E294E"),
    color("#2E294E"),
    color("#2E294E"),
    color("#2E294E"),
    color("#2E294E"),
    color("#2E294E")
  ];

  colors.forEach(c => c.setAlpha(16));

  init();

  // Set a lower framerate just to keep the fan from spinning up
  frameRate(15);
};

function draw() {
  for (let i = 0; i < numLines; i++) {
    lines[i]();
  }
};

function mouseClicked() {
  if (isLooping()) {
    noLoop();
  } else {
    loop();
  }
}

function sandstroke(start, end) {
  var amplitude = 400,
      myColor = color(0, 0, 0, 16),
      grains = 200,
      coro;

  function* render() {
    const vec = p5.Vector.sub(end, start),
          l = vec.mag();

    // "sg" comes from Jared Tarbell's original Processing sketch. I'm not sure
    // what it means, but it is used in the sine function that spreads out the
    // "sand grains".
    let sg = random(0.01, 0.1);

    let i = 0;

    while (true) {
      const t = i / l,
            w = sg / grains,
            x = lerp(0, l, t);

      push();

      translate(start);
      rotate(vec.heading());

      myColor.setAlpha(16);
      stroke(myColor);
      point(x, 0);

      for (let j = 0; j < grains; j++) {
        const y = amplitude * sin(j * w);

        myColor.setAlpha(255 * (0.1 - (j / (grains * 10 + 10))));
        stroke(myColor);

        point(x, y);
        point(x, -y);
      }

      // Perturb sg so we get a different value out of our call to sin(). These
      // magic numbers come from Jared Tarbell's implementation.
      sg += random(-0.042, 0.042);

      // Clamp the value between [-0.3, 0.3]. Again the magic numbers are from
      // Tarbell.
      sg = min(max(-0.3, sg), 0.3);

      // Randomly switch colors. More magic numbers courtesy of Jared Tarbell.
      // Don't be fooled: random(10000) > 9900 isn't 99 / 100 because random()
      // returns a floating point so there are significantly more than 10k
      // possible return values from that call.
      if (sg > -0.01 && sg < 0.01 && random(10000) > 9900) {
        myColor = random(colors);
      }

      pop();

      yield;

      i++;
      if (i > l) i = 0;
    }
  }

  function draw() {
    if (!coro) coro = render();
    coro.next();
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
