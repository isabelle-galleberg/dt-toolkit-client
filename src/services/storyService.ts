import axios from 'axios';
import { Story } from '../types/story';

const API_URL = `${import.meta.env.VITE_API_URL}/stories`;

export const getStory = async (id: string): Promise<Story> => {
  try {
    const response = await axios.get<Story>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching story:', error);
    throw error;
  }
};
