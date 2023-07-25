import welcomeHeader from '../../../../assets/images/headers/welcome.png';
import aboutHeader from '../../../../assets/images/headers/about.png';
import projectsHeader from '../../../../assets/images/headers/projects.png';
import contactHeader from '../../../../assets/images/headers/contact.png';

const HEADERS = [
  'welcome',
  'about',
  'projects',
  'contact'
];

const IMAGE_SOURCES: {[key: string]: string} = {
  'welcome': welcomeHeader,
  'about': aboutHeader,
  'projects': projectsHeader,
  'contact': contactHeader
}

function loadHeaderImages(callback: (images: {[key: string]: HTMLImageElement}) => void) {
  const images: {[key: string]: HTMLImageElement} = {};
  let numLoaded = 0;
  HEADERS.forEach(header => {
    const image: HTMLImageElement = new Image();
    image.onload = (() => {
      images[header] = image;
      numLoaded++;
      if (numLoaded >= HEADERS.length) callback(images);
    });
    image.src = IMAGE_SOURCES[header];
    image.crossOrigin = 'anonymous';
  });
}

export default {
  loadHeaderImages
}