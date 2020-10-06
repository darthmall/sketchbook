const fs = require("fs");
const path = require("path");

const nunjucks = require("nunjucks");
const polka = require("polka");

nunjucks.configure(path.join("src", "templates"));

const SKETCHDIR = path.join(path.dirname(__dirname), "sketches");

function index(req, res) {
  let sketches = fs.readdirSync(SKETCHDIR).map((s) => path.basename(s, ".js"));
  res.end(nunjucks.render(
    "index.njk",
    { sketches }
  ));
}

function sketch(req, res) {
  res.end(nunjucks.render(
    "sketch.njk",
    { sketch: req.params.sketch }
  ))
}

polka()
  .get("/", index)
  .get("/:sketch/", sketch)
  .listen(8080, (err) => {
    if (err) throw err;
    console.log("> Running on http://localhost:8080/");
  });
