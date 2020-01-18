let startX, startY = 0;

let imgs = [];

function downloadImage() {     
  const img = saveCanvas.toDataURL("image/jpeg");   
  
  const save = document.createElement('a');

  save.download = "image.png";
  save.href = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');

  save.click();
}

function saveImage(canvas) {
  const img = canvas.toDataURL("image/png");
  imgs.push(img.replace(/^data:image\/[^;]/, 'data:application/octet-stream'));

  console.log(imgs);
}

export {saveImage, downloadImage};