let imgs = [];

function downloadImage() {
  const saveCanvas = document.createElement('canvas');
  const ctx = saveCanvas.getContext('2d');

  let startX = 0;
  let startY = 0;

  saveCanvas.width = ctx.width = 674;
  saveCanvas.height = ctx.height = 1011;

  for(let img of imgs) {
    loadImage(img).then(image => {
      ctx.drawImage(image, startX, startY, 336, 403);
      startX += 336;
      if(startX >= 336*2) {
        startX = 0;
        startY += 403;
      }
    });
  }

  window.setTimeout(() => {
    const img = saveCanvas.toDataURL("image/jpeg");
  
    const save = document.createElement('a');
    
    save.download = "image.jpeg";
    save.href = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    
    save.click();
  }, 5000);
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