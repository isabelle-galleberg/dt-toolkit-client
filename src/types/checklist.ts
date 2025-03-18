export interface ChecklistItem {
  _id: string;
  userId: string;
  text: string;
}

export interface ChecklistFeedback {
  strengths: string;
  improvements: string;
}
