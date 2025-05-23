export interface Persona {
  _id: string;
  userId: string;
  cardId: string;
  traits: string[];
  name: string;
  age: number | null;
  occupationAndHobbies: string;
  hopes: string;
  challenges: string;
  quote: string;
  sliders: number[];
}

export interface PersonaCard {
  _id?: string;
  alias: string;
  cardImageUrl: string;
  personaImageUrl: string;
  traits: string[];
  sender?: string;
  subject?: string;
  text?: string[];
  buttonText?: string;
  buttonLink?: string;
}

export interface PersonaInfo {
  cardId: string;
  traits: string[];
  name: string;
  age: number | null;
  occupationAndHobbies: string;
  hopes: string;
  challenges: string;
  quote: string;
  sliders: number[];
}
