export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb
}
export enum CellState {
  open,
  visible,
  flaged
}
export type Cell = {
  value: CellValue;
  state: CellState;
};
