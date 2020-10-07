window.Sketch = window.Sketch || {};

window.Sketch.createStyle = function(style) {
  let elt = document.createElement("style");
  elt.innerText = style;
  document.head.appendChild(elt);
};
