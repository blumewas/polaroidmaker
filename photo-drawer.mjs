let moveImg = false;
let img = undefined;

let startX = 0;
let startY = 0;

const size = 1000;

function readURL(input) {
  if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        Drawer.img = new Image();
        Drawer.img.src = e.target.result;
        Drawer.img.onload = onLoad();
      };

      reader.readAsDataURL(input.files[0]);
  }
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

function toggleMove() {
  moveImg = !moveImg;
}

function drawImage(context) {
  context.drawImage(img, startX, startY, size, size, 20, 20, 298, 298);
}

export {moveImage, drawImage, readURL, toggleMove };