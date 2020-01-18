let moveImg = false;

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

export {moveImage, moveImg};