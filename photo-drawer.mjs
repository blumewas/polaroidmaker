let moveImg = false;
let img = undefined;

let startX = 0;
let startY = 0;

const size = 1000;

let filterElem, canvas, ctx;
let filter = 'filter-normal';

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

function changeFilter(event) {
  if(event) {
    const fil = event.target.value;
    filterElem.classList.replace(filter, `filter-${fil}`);
    filter = `filter-${fil}`;
  }

  const filterValue = window.getComputedStyle(filterElem).filter;
  ctx.filter = filterValue;
}

function onLoad() {
  changeFilter();
  drawImage();
}

function moveImage(event) {
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
}

function toggleMove(move) {
  if(!img) {
    return;
  }
  moveImg = move;
}

function drawImage() {
  ctx.drawImage(img, startX, startY, size, size, 20, 20, 298, 298);
}

function init () {
  filterElem = document.getElementById('currFilter');
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
}

export {moveImage, drawImage, readURL, toggleMove, init, changeFilter };