import axios from 'axios';
import { PersonaCard } from '../types/persona';

const isProduction = import.meta.env.MODE === 'production';

const API_URL = isProduction
  ? 'https://dt-webapp-e6b8gxbjhbamb7fu.westeurope-01.azurewebsites.net/api/personaCards'
  : `${import.meta.env.VITE_API_URL}/personaCards`;

export const getPersonaCards = async (): Promise<PersonaCard[]> => {
  try {
    const response = await axios.get<PersonaCard[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching personas:', error);
    throw error;
  }
};
