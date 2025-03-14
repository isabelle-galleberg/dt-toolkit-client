import api from './api';
import { Persona } from '../types/persona';

const API_URL = '/personas';

export const getPersona = async (cardId: string): Promise<Persona> => {
  const response = await api.get<Persona>(`${API_URL}/${cardId}`);
  return response.data;
};

export const upsertPersona = async (
  personaData: Partial<Persona>
): Promise<Persona> => {
  const response = await api.post<Persona>(API_URL, personaData);
  return response.data;
};
