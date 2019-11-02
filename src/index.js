import * as dat from "dat.gui";

const gui = new dat.GUI();
const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

let wave = {
  freq: 0.01,
  amp: 100,
  length: 0.01
};

let colors = {
  h: 0,
  s: 50,
  l: 50
};

const primaryFolder = gui.addFolder("primary");
primaryFolder.add(wave, "freq", 0.01, 0.1);
primaryFolder.add(wave, "amp", 0, canvas.height);
primaryFolder.add(wave, "length", 0.01, 0.1);
primaryFolder.open();

const color = gui.addFolder("color");
color.add(colors, "h", 0, 360);
color.add(colors, "s", 0, 100);
color.add(colors, "l", 0, 100);
color.open();

let increment = 0;
function animate() {
  requestAnimationFrame(animate);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.fillStyle = "rgba(0,0,0,0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < canvas.width; i++) {
    ctx.lineTo(
      i,
      canvas.height / 2 +
        Math.sin(i * wave.length + increment) * wave.amp * Math.sin(increment)
    );
  }
  ctx.strokeStyle = `hsl(${Math.abs(
    (colors.h ? colors.h : 360) * Math.sin(increment)
  )},${colors.s}%,${colors.l}%)`;
  ctx.stroke();
  increment += wave.freq;
}

animate();
