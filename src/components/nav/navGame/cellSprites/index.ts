import treeImage from '../../../../assets/images/tree/tree.png';
import { CellSprite } from '../../../../types/cellSprite';

const images = {
  tree: treeImage
}

function getImage(cellSprite: CellSprite): string {
  return images[cellSprite];
}

export default {
  getImage
}