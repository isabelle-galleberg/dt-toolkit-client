import axios from 'axios';
import { Persona } from '../types/persona';

const API_URL = `${import.meta.env.VITE_API_URL}/personas`;

export const getPersona = async (cardId: string): Promise<Persona> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<Persona>(`${API_URL}/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching persona:', error);
    throw error;
  }
};

export const upsertPersona = async (
  personaData: Partial<Persona>
): Promise<Persona> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post<Persona>(API_URL, personaData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating/updating persona:', error);
    throw error;
  }
};
