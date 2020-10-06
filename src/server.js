const polka = require("polka");

polka().get("/", (req, res) => {
  res.end("<h1>Hello, world</h1>");
}).listen(8080, err => {
  if (err) throw err;
  console.log("> Running on http://localhost:8080/");
});
