export interface Persona {
  _id: string;
  userId: string;
  cardId: string;
  traits: string[];
  name: string;
  age: number | null;
  occupationAndHobbies: string;
  technologyUsage: string;
  sliders: number[];
}

export interface PersonaCard {
  _id?: string;
  alias: string;
  cardImageUrl: string;
  personaImageUrl: string;
  traits: string[];
}

export interface PersonaInfo {
  cardId: string;
  traits: string[];
  name: string;
  age: number | null;
  occupationAndHobbies: string;
  technologyUsage: string;
  sliders: number[];
}
