let startX, startY = 0;

let imgs = [];

function downloadImage() {
  const saveCanvas = document.getElementById('saveCanvas');
  const ctx = saveCanvas.getContext('2d');

  saveCanvas.width = ctx.width = 1205;
  saveCanvas.height = ctx.height = 1795;

  for(let img of imgs) {
    loadImage(img).then(image => {
      document.body.appendChild(image);
      ctx.drawImage(image, startX, startY);
      startX += 337;
      if(startX >= 900) {
        startX = 0;
        startY += 404;
      }
    });
      // const img = saveCanvas.toDataURL("image/png");
  
      // const save = document.createElement('a');
    
      // save.download = "image.png";
      // save.href = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    
      // save.click();

  }
}

function saveImage(canvas) {
  const img = canvas.toDataURL("image/jpeg");
  imgs.push(img);
}

const loadImage = url => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`load ${url} fail`));
    img.src = url;
  });
};

export {saveImage, downloadImage};