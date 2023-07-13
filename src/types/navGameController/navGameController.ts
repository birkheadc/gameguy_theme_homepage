import { Direction } from "../direction";

export interface INavGameMovementController {
  registerKeyDown: (key: string) => boolean,
  registerKeyUp: (key: string) => boolean,
  getCurrentDirection: () => Direction | null,
  clearKeysDown: () => void
}

export class NavGameMovementController implements INavGameMovementController {

  keys: string[];
  downKeys: Set<string>;

  constructor() {
    this.keys = [ 'w', 'd', 's', 'a', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft' ];
    this.downKeys = new Set<string>();
  }

  registerKeyDown(key: string) {
    if (this.keys.includes(key)) {
      this.downKeys.add(key);
      return true;
    }
    return false;
  }

  registerKeyUp(key: string) {
    if (this.keys.includes(key)) {
      this.downKeys.delete(key);
      return true;
    }
    return false;
  }

  getCurrentDirection() {
    if (this.downKeys.size < 1) return null;
    const latestKey: string = [...this.downKeys][this.downKeys.size - 1];
    switch (latestKey) {
      case 'w':
      case 'ArrowUp':
        return Direction.UP;
      case 'd':
      case 'ArrowRight':
        return Direction.RIGHT;
      case 's':
      case 'ArrowDown':
        return Direction.DOWN;
      case 'a':
      case 'ArrowLeft':
        return Direction.LEFT;
      default:
        return null;
    }
  }

  clearKeysDown() {
    this.downKeys = new Set<string>();
  }
}