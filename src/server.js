const path = require("path");

const nunjucks = require("nunjucks");
const polka = require("polka");

nunjucks.configure(path.join("src", "templates"));

polka().get("/", (req, res) => {
  res.end(nunjucks.render("index.njk"));
}).listen(8080, err => {
  if (err) throw err;
  console.log("> Running on http://localhost:8080/");
});
