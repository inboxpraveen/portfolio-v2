class Hexagon {
  constructor(x, y, R, offset) {
    this.x = x;
    this.y = y;
    this.R = R;
    this.offset = offset;
  }
  draw(now) {
    ctx.save();
    ctx.translate(this.x, this.y);
    let nrOfShadows = (Math.cos((now / 30 + this.offset) / 15) + 1) * 5;
    for (let j = 0; j < nrOfShadows; j += 0.2) {
      let stroke = j * 10;
      ctx.strokeStyle = `rgb(${stroke}, ${stroke}, ${stroke})`;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        let angle = Math.PI / 3 * i + Math.PI / 6;
        let x = Math.cos(angle) * this.R + j;
        let y = Math.sin(angle) * this.R + j * 1.5;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  }}
let canvas;
let ctx;
let w, h;
let hexagons;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", reset);
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  ctx.fillStyle = "grey";
  setupHexagons();
}
function setupHexagons() {
  hexagons = [];
  let r = 50;
  let R = r / Math.cos(Math.PI / 6);
  let t = r * 2 / Math.sqrt(3);
  let rows = w / (r * 2) + 1;
  let cols = h / R;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let xOffset = y % 2 === 0 ? r : 0;
      let xPixel = r * x * 2 + xOffset;
      let yPixel = (t / 2 + R) * y;
      let xDelta = w / 2 - xPixel;
      let yDelta = h / 2 - yPixel;
      let offset = Math.sqrt(xDelta * xDelta + yDelta * yDelta) / 15;
      let hexagon = new Hexagon(xPixel, yPixel, R, offset);
      hexagons.push(hexagon);
    }
  }
}
function draw(now) {
  requestAnimationFrame(draw);
  ctx.fillRect(0, 0, w, h);
  hexagons.forEach(h => {
    h.draw(now);
  });
}
setup();
draw();