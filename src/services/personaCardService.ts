import api from './api';
import { PersonaCard } from '../types/persona';

const API_URL = '/persona-cards';

export const getPersonaCards = async (): Promise<PersonaCard[]> => {
  try {
    const response = await api.get<PersonaCard[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching persona cards:', error);
    throw error;
  }
};

export const upsertPersonaCards = async (
  personaData: PersonaCard
): Promise<PersonaCard> => {
  try {
    const response = await api.post<PersonaCard>(API_URL, personaData);
    return response.data;
  } catch (error) {
    console.error('Error creating/updating persona card:', error);
    throw error;
  }
};
