import api from './api';
import { Story } from '../types/story';

const API_URL = '/stories';

export const getStory = async (id: string): Promise<Story> => {
  try {
    const response = await api.get<Story>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching story:', error);
    throw error;
  }
};
