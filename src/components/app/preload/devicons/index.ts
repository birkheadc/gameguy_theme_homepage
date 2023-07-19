import angularjs from '../../../../assets/images/devicons/angularjs-plain.png';
import babel from '../../../../assets/images/devicons/babel-original.png';
import bash from '../../../../assets/images/devicons/bash-original.png';
import blender from '../../../../assets/images/devicons/blender-original.png';
import csharp from '../../../../assets/images/devicons/csharp-plain.png';
import css3 from '../../../../assets/images/devicons/css3-plain.png';
import docker from '../../../../assets/images/devicons/docker-original.png';
import dotnetcore from '../../../../assets/images/devicons/dotnetcore-original.png';
import git from '../../../../assets/images/devicons/git-original.png';
import html5 from '../../../../assets/images/devicons/html5-plain.png';
import java from '../../../../assets/images/devicons/java-original.png';
import javascript from '../../../../assets/images/devicons/javascript-plain.png';
import jest from '../../../../assets/images/devicons/jest-plain.png';
import linux from '../../../../assets/images/devicons/linux-original.png';
import mongodb from '../../../../assets/images/devicons/mongodb-original.png';
import mysql from '../../../../assets/images/devicons/mysql-original.png';
import nginx from '../../../../assets/images/devicons/nginx-original.png';
import nodejs from '../../../../assets/images/devicons/nodejs-original.png';
import npm from '../../../../assets/images/devicons/npm-original-wordmark.png';
import postgres from '../../../../assets/images/devicons/postgresql-plain.png';
import python from '../../../../assets/images/devicons/python-original.png';
import rails from '../../../../assets/images/devicons/rails-plain.png';
import react from '../../../../assets/images/devicons/react-original.png';
import ruby from '../../../../assets/images/devicons/ruby-original.png';
import spring from '../../../../assets/images/devicons/spring-original.png';
import sqlite from '../../../../assets/images/devicons/sqlite-plain.png';
import ssh from '../../../../assets/images/devicons/ssh-original.png';
import typescript from '../../../../assets/images/devicons/typescript-plain.png';
import unity from '../../../../assets/images/devicons/unity-original.png';
import unreal from '../../../../assets/images/devicons/unrealengine-original.png';
import webpack from '../../../../assets/images/devicons/webpack-original.png';
import wordpress from '../../../../assets/images/devicons/wordpress-plain.png';

const IMAGE_SOURCES: string[] = [
  angularjs,
  babel,
  bash,
  blender,
  csharp,
  css3,
  docker,
  dotnetcore,
  git,
  html5,
  java,
  javascript,
  jest,
  linux,
  mongodb,
  mysql,
  nginx,
  nodejs,
  npm,
  postgres,
  python,
  rails,
  react,
  ruby,
  spring,
  sqlite,
  ssh,
  typescript,
  unity,
  unreal,
  webpack,
  wordpress
];

function loadDevicons(callback: (images: HTMLImageElement[]) => void) {
  const images: HTMLImageElement[] = [];
  IMAGE_SOURCES.forEach(src => {
    const image: HTMLImageElement = new Image();
    image.src = src;
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      images.push(image);
      if (images.length >= IMAGE_SOURCES.length) {
        callback(images);
      }
    }
  });
}

export default {
  loadDevicons
}