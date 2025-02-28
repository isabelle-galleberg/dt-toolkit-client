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
