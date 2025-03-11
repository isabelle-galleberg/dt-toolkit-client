export interface ProblemUnderstanding {
  _id: string;
  userId: string;
  cardId: string;
  whatHappened: string[];
  whyItHappened: string[];
  consequences: string[];
}
