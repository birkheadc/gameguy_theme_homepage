

// const IMAGE_SOURCES: string[] = [

// ];

const IMAGE_SOURCES: string[] = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ssh/ssh-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg'
];

function loadDevicons(callback: (images: HTMLImageElement[]) => void) {
  const images: HTMLImageElement[] = [];
  IMAGE_SOURCES.forEach(src => {
    const image = new Image();
    image.src = src;
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      images.push(image);
      if (images.length >= IMAGE_SOURCES.length) {
        console.log(images);
        callback(shuffleArray(images));
      }
    }
  });
}

export default {
  loadDevicons
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}
