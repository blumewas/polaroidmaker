import * as Photo from './photo-save.mjs';
import * as Drawer from './photo-drawer.mjs'

let canvas, ctx;

const polaroidHeight = 403;
const polaroidWidth = 336;

function showImage(event) {
  event.preventDefault();
  Drawer.readURL(event.target.image);
}

function onChange(event) {
  Drawer.changeFilter(event);
  Drawer.drawImage();
}

window.onload = function () {
  Drawer.init();

  const form = document.getElementById('form');
  form.addEventListener('submit', showImage);

  const filterSelect = document.getElementById('filterSelect');
  filterSelect.onchange = this.onChange;

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  ctx.height = canvas.height = polaroidHeight;
  ctx.width = canvas.width = polaroidWidth;

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, polaroidWidth, polaroidHeight);
  ctx.fillStyle = '#fff';
  ctx.fillRect(1, 1, polaroidWidth-2, polaroidHeight-2);

  canvas.addEventListener('mousedown', () => {
    Drawer.toggleMove();
  });

  window.addEventListener('mouseup', () => {
    Drawer.toggleMove();
  });

  canvas.addEventListener('mousemove', (event) => {
    Drawer.moveImage(event);
  });

  const btn = document.getElementById('save');
  btn.addEventListener('click', () => {
    Photo.saveImage(canvas);
  });

  const btn2 = document.getElementById('print');
  btn2.addEventListener('click', Photo.downloadImage);
}