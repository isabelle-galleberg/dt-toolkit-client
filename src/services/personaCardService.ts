import axios from 'axios';
import { PersonaCard } from '../types/persona';

const API_URL = `${import.meta.env.VITE_API_URL}/personaCards`;

export const getPersonaCards = async (): Promise<PersonaCard[]> => {
  try {
    const response = await axios.get<PersonaCard[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching personas:', error);
    throw error;
  }
};
