export interface Email {
  sender: string;
  subject: string;
  content: JSX.Element;
  buttonText: string;
  buttonLink: string;
  correctAnswer: 'Scam' | 'Legit';
  scamSigns: string[];
  explanation: string;
}
