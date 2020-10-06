const path = require("path");

const nunjucks = require("nunjucks");
const polka = require("polka");

nunjucks.configure(path.join("src", "templates"));

function index(req, res) {
  res.end(nunjucks.render("index.njk"));
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
