export interface Email {
  sender: string;
  subject: string;
  greeting: string;
  text: string;
  buttonText: string;
  buttonLink: string;
  correctAnswer: 'Scam' | 'Legit';
  scamSigns: string[];
  explanation: string;
  personal?: boolean;
}
