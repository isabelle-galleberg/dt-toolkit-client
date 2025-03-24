export interface Feedback {
  _id: string;
  userId: string;
  cardId: string;
  feedback: string[];
  score: number;
  testCompleted: boolean;
}
