export interface Persona {
  _id: string;
  userId: string;
  cardId: string;
  characteristics: string[];
  name: string;
  age: number | null;
  occupation: string;
  hobbies: string;
  goals: string;
  frustrations: string;
  slider1: number;
  slider2: number;
  slider3: number;
}

export interface PersonaCard {
  _id: string;
  type: string;
  description: string;
  imageUrl: string;
  quote: string;
  characteristics: string[];
}

export interface PersonaInfo {
  cardId: string;
  characteristics: string[];
  name: string;
  age: number | null;
  occupation: string;
  hobbies: string;
  goals: string;
  frustrations: string;
  slider1: number;
  slider2: number;
  slider3: number;
}
