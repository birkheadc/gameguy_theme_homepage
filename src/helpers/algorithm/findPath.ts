import { ICell } from "../../types/cell";
import { IVector2 } from "../../types/vectory2";

export default function findPath(from: IVector2, to: IVector2, gridCells: ICell[][]): IVector2[] {
  // Return empty array if already at destination.
  if (from.x === to.x && from.y === to.y) return [];
  // Return empty array if parameters are invalid.
  if (gridCells.length < 1 || gridCells[0].length < 1) return []; 
  if (from.x >= gridCells.length || from.y >= gridCells[0].length || to.x >= gridCells.length || to.y >= gridCells[0].length) return [];
  if (from.x < 0 || from.y < 0 || to.x < 0 || to.y < 0) return [];
  if (Math.floor(from.x) !== from.x || Math.floor(from.y) !== from.y || Math.floor(to.x) !== to.x || Math.floor(to.y) !== to.y ) return [];
  // Create an empty grid the same size as gridCells but full of integers.
  // Init array at -1 if traversable, -2 if not.
  const cells: number[][] = Array.from(gridCells, c => Array.from(c, c => c.isTraversable ? -1 : -2));

  if (cells[to.x][to.y] === -2) return [];
  if (cells[from.x][from.y] === -2) return [];

  cells[to.x][to.y] = 0;
  cells[from.x][from.y] = 1;

  const open = new PrioQ<IVector2>();
  const closed: boolean[][] = Array.from(gridCells, c => Array.from(c, _ => false));

  open.enq(from, 0);

  while (open.length > 0) {
    const q: IVector2 | null = open.deq();
    if (q == null) return [];

    const qG = cells[q.x][q.y];
    
    const successors = generateSuccessors(q, cells.length - 1, cells[0].length - 1);
    for (let i = 0; i < successors.length; i++) {
      const s = successors[i];
      if (cells[s.x][s.y] === -2) continue;
      if (cells[s.x][s.y] === 0) {
        // const solution = [];
        // let step = closed.deq();
        // while (closed.length > 0 && step != null && (step.x !== to.x || step.y !== to.y)) {
        //   solution.push(step);
        //   step = closed.deq();
        // }
        // return solution;
        return buildPathFromCompletedCells(cells, to);
      }
    
      const g = qG + 1;
      const h = calculateH(s, to);
      const f = g + h;

      const openPrio = open.getPrio(s);
      if (openPrio != null && openPrio < f) continue;

      const closedPrio = closed[s.x][s.y];
      if (closedPrio) continue;

      cells[s.x][s.y] = g;
      open.enq(s, f);
    }
    closed[q.x][q.y] = true;
  }
  return [];
}

function generateSuccessors(cell: IVector2, maxX: number, maxY: number): IVector2[] {
  const successors: IVector2[] = [];

  if (cell.y > 0) successors.push({...cell, y: cell.y - 1});
  if (cell.y < maxY) successors.push({...cell, y: cell.y + 1});
  if (cell.x > 0) successors.push({...cell, x: cell.x - 1});
  if (cell.x < maxX) successors.push({...cell, x: cell.x + 1});

  return successors;
}

function calculateH(from: IVector2, to: IVector2): number {
  return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
}

function buildPathFromCompletedCells(cells: number[][], to: IVector2): IVector2[] {
  const solution = [];
  solution.push(to);
  let step: IVector2 | null = calculateLowestPositiveSuccessor(cells, generateSuccessors(to, cells.length - 1, cells[0].length - 1));

  while (step != null && cells[step.x][step.y] > 1) {
    solution.push(step);
    const successors: IVector2[] = generateSuccessors(step, cells.length - 1, cells[0].length - 1);
    const next = getSuccessorWithNValue(cells, successors, cells[step.x][step.y] - 1);
    if (next == null) {
      return [];
    }
    step = next;
  }

  return solution.reverse();
}

function calculateLowestPositiveSuccessor(cells: number[][], successors: IVector2[]): IVector2 | null {
  let bestSuccessor = null;
  let bestValue = -1;

  for (let i = 0; i < successors.length; i++) {
    const value = cells[successors[i].x][successors[i].y];
    if (value < 0) continue;
    if (bestValue < 0 || value < bestValue) {
      bestSuccessor = successors[i];
      bestValue = value;
    }
  }
  return bestSuccessor;
}

function getSuccessorWithNValue(cells: number[][], successors: IVector2[], n: number): IVector2 | null {
  for (let i = 0; i < successors.length; i++) {
    if (cells[successors[i].x][successors[i].y] === n) {
      return successors[i]
    };
  }
  return null;
}

class PrioQ<T> {
  head: PrioQNode<T> | null = null;
  length: number = 0;

  enq(val: T, prio: number): void {
    this.length++;
    const newNode = new PrioQNode<T>(val, prio);
    if (this.head == null) this.head = newNode;
    else if (this.head.prio > prio) {
      newNode.next = this.head;
      this.head = newNode;
    }
    else {
      let node = this.head;
      while (node.next != null && node.prio < prio) {
        node = node.next;
      }
      const newNext = node.next;
      node.next = newNode;
      newNode.next = newNext;
    }
  }

  deq(): T | null {
    if (this.length > 0) this.length--;
    const r = this.head;
    this.head = this.head?.next ?? null;
    return r?.val ?? null;
  }

  getPrio(search: T): number | null {
    let node = this.head;
    while (node != null) {
      if (node.val === search) return node.prio;
      node = node.next;
    }
    return null;
  }
}

class PrioQNode<T> {
  val: T;
  prio: number;
  next: PrioQNode<T> | null = null;

  constructor(val: T, prio: number) {
    this.val = val;
    this.prio = prio;
  }
}