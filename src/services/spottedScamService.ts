import axios from 'axios';
import { SpottedScam } from '../types/define';

const API_URL = `${import.meta.env.VITE_API_URL}/spot-scam`;

export const getSpottedScams = async (
  cardId: string
): Promise<SpottedScam[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found.');

    const response = await axios.get<SpottedScam[]>(`${API_URL}/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching spotted scams:', error);
    throw error;
  }
};

export const addSpottedScam = async (
  scamData: Partial<SpottedScam>
): Promise<SpottedScam> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post<SpottedScam>(API_URL, scamData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding spotted scam:', error);
    throw error;
  }
};

export const deleteSpottedScam = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting spotted scam:', error);
    throw error;
  }
};
