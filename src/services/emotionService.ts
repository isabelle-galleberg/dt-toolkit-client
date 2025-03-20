import api from './api';
import { Emotions } from '../types/emotions';

const API_URL = '/emotions';

export const getEmotions = async (personaId: string): Promise<string[]> => {
  try {
    const response = await api.get(`${API_URL}/${personaId}`);
    return Object.values(response.data) as string[];
  } catch (error) {
    console.error('Error fetching emotions:', error);
    throw error;
  }
};

export const updateEmotions = async (
  personaId: string,
  index: string,
  emotion: string
): Promise<Emotions> => {
  try {
    const response = await api.post(`${API_URL}/${personaId}`, {
      index,
      emotion,
    });
    return response.data as Emotions;
  } catch (error) {
    console.error('Error updating emotion:', error);
    throw error;
  }
};
