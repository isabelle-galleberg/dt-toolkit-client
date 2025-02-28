import axios from 'axios';
import { Define } from '../types/define';

const API_URL = `${import.meta.env.VITE_API_URL}/define`;

export const getStatement = async (): Promise<Define[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<Define[]>(API_URL, {
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

export const addProblemExploration = async (
  personaId: string,
  listType: 'problems' | 'causes' | 'consequences',
  text: string
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/${personaId}`,
      { text, listType },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error adding problem exploration:', error);
    throw error;
  }
};

export const getProblems = async (personaId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${personaId}/problems`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error;
  }
};

export const getCauses = async (personaId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${personaId}/causes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching causes:', error);
    throw error;
  }
};

export const getConsequences = async (personaId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${personaId}/consequences`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching consequences:', error);
    throw error;
  }
};

export const deleteProblemExploration = async (
  personaId: string,
  listType: 'problems' | 'causes' | 'consequences',
  itemId: string
) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/${personaId}/${listType}/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Error deleting problem exploration:', error);
    throw error;
  }
};

export const toggleSelected = async (
  personaId: string,
  listType: 'problems' | 'causes' | 'consequences',
  itemId: string
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${API_URL}/${personaId}/${listType}/${itemId}/toggle`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error toggling selected state:', error);
    throw error;
  }
};
