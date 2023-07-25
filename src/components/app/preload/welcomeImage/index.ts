import myphoto from '../../../../assets/images/pictures/me02.png';

function loadMyPhoto(callback: ((image: HTMLImageElement) => void)) {
  const image = new Image();
  image.onload = (() => {
    callback(image);
  });
  image.src = myphoto;
  image.crossOrigin = 'anonymous';
}

export default {
  loadMyPhoto
}