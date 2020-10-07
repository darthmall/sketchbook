// An attempt to recreate Jared Tarbell's Sand.Stroke
// http://www.complexification.net/gallery/machines/sandstroke/

const style = document.createElement("style");
style.innerText = `html {
  background-color: #2E294E;
}`;
document.head.appendChild(style);

function sketch(p) {
  const size = 600;

  const colors = [
    p.color("#FFF2F1"),
    p.color("#107E7D"),
    p.color("#D1495B"),
    p.color("#FFD400")
  ];

  const numLines = 12;

  let lines = [];

  function init() {
    for (let i = 0; i < numLines; i++) {
      lines[i] = [p.random(size), p.random(colors)];
    }
  }

  p.setup = function() {
    p.createCanvas(size, size);
    init();
    p.noLoop();
  };

  p.draw = function() {
    for (let i = 0; i < numLines; i++) {
      const [y, c] = lines[i];
      p.stroke(p.red(c), p.green(c), p.blue(c), 255);
      p.line(0, y, size, y);
    }
  };
}

new p5(sketch);
