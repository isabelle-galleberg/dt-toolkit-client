export interface Define {
  _id: string;
  userId: string;
  personaId: string;
  problems: ProblemExploration[];
  causes: ProblemExploration[];
  consequences: ProblemExploration[];
  problemStatement: string;
}

export interface ProblemExploration {
  _id: string;
  text: string;
  selected: boolean;
}

export interface SpottedScam {
  _id: string;
  userId: string;
  cardId: string;
  numeration: number;
  inputText: string;
  pin_x: number;
  pin_y: number;
}
