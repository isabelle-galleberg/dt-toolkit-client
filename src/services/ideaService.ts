import axios from 'axios';
import { Idea } from '../types/idea';

const API_URL = `${import.meta.env.VITE_API_URL}/ideas`;

export const getIdeas = async (): Promise<Idea[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<Idea[]>(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ideas:', error);
    throw error;
  }
};

export const addIdea = async (idea: { text: string }): Promise<Idea> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post<Idea>(API_URL, idea, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding idea:', error);
    throw error;
  }
};

export const deleteIdea = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting idea:', error);
    throw error;
  }
};
