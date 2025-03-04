import axios from 'axios';
import { PersonaCard } from '../types/persona';

const API_URL = `${import.meta.env.VITE_API_URL}/persona-cards`;

export const getPersonaCards = async (): Promise<PersonaCard[]> => {
  try {
    const response = await axios.get<PersonaCard[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching personas:', error);
    throw error;
  }
};

export const upsertPersonaCards = async (
  personaData: PersonaCard
): Promise<PersonaCard> => {
  try {
    const response = await axios.post<PersonaCard>(API_URL, personaData);
    return response.data;
  } catch (error) {
    console.error('Error creating/updating persona:', error);
    throw error;
  }
};
