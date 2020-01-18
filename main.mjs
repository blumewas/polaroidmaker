import * as photo from './photo-save.mjs';

let canvas, ctx, filterElem;
let filter = 'filter-normal';
let img = undefined;
let moveImg = false;

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
    moveImg = true;
  });

  window.addEventListener('mouseup', () => {
    moveImg = false;
  });

  canvas.addEventListener('mousemove', (event) => {
    if(moveImg) {
      const moveX = event.movementX;
      const moveY = event.movementY;

      startX += moveX;
      startY += moveY;

      if(startX < 0) {
        startX = 0;
      }
      if(startY < 0) {
        startY = 0;
      }

      const endX = startX + size;
      const endY = startY + size;
      if(endX > img.width) {
        startX = img.width - size;
      }
      if (endY > img.height) {
        startY = img.height - size;
      }
      drawImage();
    }
  });

  const btn = document.getElementById('save');
  btn.addEventListener('click', photo.saveImage(canvas));

  const btn2 = document.getElementById('print');
  btn2.addEventListener('click', photo.downloadImage);
}