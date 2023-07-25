import fbIcon from '../../../../assets/images/devicons/facebook-original.png';
import ghIcon from '../../../../assets/images/devicons/github-original.png';
import liIcon from '../../../../assets/images/devicons/linkedin-original.png';

const ICONS = [
  'facebook',
  'github',
  'linkedin'
];

const IMAGE_SOURCES: {[key: string]: string} = {
  'facebook': fbIcon,
  'github': ghIcon,
  'linkedin': liIcon
}

function loadSocialicons(callback: (icons: {[key: string]: HTMLImageElement}) => void) {
  const images: {[key: string]: HTMLImageElement} = {};
  let numLoaded = 0;
  ICONS.forEach(icon => {
    const image: HTMLImageElement = new Image();
    image.onload = (() => {
      images[icon] = image;
      numLoaded++;
      if (numLoaded >= ICONS.length) callback(images);
    });
    image.src = IMAGE_SOURCES[icon];
    image.crossOrigin = 'anonymous';
  });
}

export default {
  loadSocialicons
}