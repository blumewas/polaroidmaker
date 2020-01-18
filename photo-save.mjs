let startX, startY = 0;

let imgs = [];

function downloadImage() {
  const saveCanvas = document.getElementById('saveCanvas');
  const ctx = saveCanvas.getContext('2d');

  saveCanvas.width = ctx.width = 1205;
  saveCanvas.height = ctx.height = 1795;

  for(let img of imgs) {
    const imgObj = new Image();
    image.onload = () => {
      imgObj.drawImage(image, startX, startY);

      startX += 337;
      if(startX >= 900) {
        startX = 0;
        startY += 404;
      }
    };
    imgObj.src = img;
  }
  const img = saveCanvas.toDataURL("image/jpeg");
  
  const save = document.createElement('a');

  save.download = "image.png";
  save.href = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');

  save.click();
}

function saveImage(canvas) {
  const img = canvas.toDataURL("image/png");
  imgs.push(img);

  console.log(imgs);
}

export {saveImage, downloadImage};