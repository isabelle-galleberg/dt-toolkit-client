import axios from 'axios';
import { Emotions } from '../types/emotions';
const API_URL = `${import.meta.env.VITE_API_URL}/emotions`;

export const getEmotions = async (): Promise<string[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/emotions/${personaId}`,
      { index, emotion },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data as Emotions;
  } catch (error) {
    console.error('Error updating emotion:', error);
    throw error;
  }
};
