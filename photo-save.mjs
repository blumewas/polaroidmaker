let saveCanvas, context;

let startX, startY = 0;

function downloadImage() {     
  const img = saveCanvas.toDataURL("image/jpeg");   
  
  const save = document.createElement('a');

  save.download = "image.png";
  save.href = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');

  save.click();
}

function saveImage(canvas) {
  if(!saveCanvas) {
    saveCanvas = document.createElement('canvas');
    context = saveCanvas.getContext('2d');

    saveCanvas.width = context.width = 1205;
    saveCanvas.height = context.height = 1795;

    context.fillStyle = '#fff';
    context.fillRect(0, 0, 1205, 1795);
  }
  const img = new Image();
  img.onload = function() {
    context.drawImage(canvas, startX, startY);
  };
  img.src = canvas.toDataURL();
  //apply the old canvas to the new one
  
  startX += 337;
  if(startX >= 1000) {
    startY += 403;
    startX = 0;
  }

  document.body.appendChild(saveCanvas);
}

export {saveImage, downloadImage};