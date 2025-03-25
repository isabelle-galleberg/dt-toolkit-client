export interface SpottedScam {
  _id: string;
  userId: string;
  cardId: string;
  numeration: number;
  inputText: string;
  pin_x: number;
  pin_y: number;
}

export interface Pin {
  id: number;
  x: number;
  y: number;
  inputText: string;
}
