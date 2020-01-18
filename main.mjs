import * as Photo from './photo-save.mjs';
import * as Drawer from './photo-drawer.mjs'

let canvas, ctx, filterElem;
let filter = 'filter-normal';
let img = undefined;

const size = 1000;
let startX = 0;
let startY = 0;

const polaroidHeight = 403;
const polaroidWidth = 336;

function showImage(event) {
  event.preventDefault();
  readURL(event.target.image);
}

function drawImage() {
  ctx.drawImage(img, startX, startY, size, size, 20, 20, 298, 298);
}

function changeFilter() {
  const filterValue = window.getComputedStyle(filterElem).filter;
  ctx.filter = filterValue;
}

function onLoad() {
  changeFilter();
  drawImage();
}

function readURL(input) {
  if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        img = new Image();
        img.src = e.target.result;
        img.onload = onLoad();
      };

      reader.readAsDataURL(input.files[0]);
  }
}

function onChange(event) {
  const fil = event.target.value;
  filterElem.classList.replace(filter, `filter-${fil}`);
  filter = `filter-${fil}`;

  changeFilter();
  drawImage();
}

window.onload = function () {
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
  filterElem = document.getElementById('currFilter');

  canvas.addEventListener('mousedown', () => {
    Drawer.moveImg = true;
  });

  window.addEventListener('mouseup', () => {
    Drawer.moveImg = false;
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