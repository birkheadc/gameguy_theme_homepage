import treeImage from '../../../../assets/images/tree/tree.png';
import groundA from '../../../../assets/images/ground/ground_a.png';
import groundB from '../../../../assets/images/ground/ground_b.png';
import groundC from '../../../../assets/images/ground/ground_c.png';
import houseBl from '../../../../assets/images/house/house_bl.png';
import houseBc from '../../../../assets/images/house/house_bc.png';
import houseBr from '../../../../assets/images/house/house_br.png';
import houseTl from '../../../../assets/images/house/house_tl.png';
import houseTc from '../../../../assets/images/house/house_tc.png';
import houseTr from '../../../../assets/images/house/house_tr.png';
import houseMl from '../../../../assets/images/house/house_ml.png';
import houseMc from '../../../../assets/images/house/house_mc.png';
import houseMr from '../../../../assets/images/house/house_mr.png';
import houseDoor from '../../../../assets/images/house/house_door.png';
import { CellSprite } from '../../../../types/cellSprite';

const images = {
  'tree': treeImage,
  'ground-a': groundA,
  'ground-b': groundB,
  'ground-c': groundC,
  'house-bl': houseBl,
  'house-bc': houseBc,
  'house-br': houseBr,
  'house-tl': houseTl,
  'house-tc': houseTc,
  'house-tr': houseTr,
  'house-ml': houseMl,
  'house-mc': houseMc,
  'house-mr': houseMr,
  'house-door': houseDoor,
}

function getImage(cellSprite: CellSprite): string {
  const image = images[cellSprite];
  console.log(`Get image: ${image}`);
  return image;
}

export default {
  getImage
}