import api from './api';
import { SpottedScam } from '../types/define';

const API_URL = '/spot-scam';

export const getSpottedScams = async (
  cardId: string
): Promise<SpottedScam[]> => {
  try {
    const response = await api.get(`${API_URL}/${cardId}`);
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
    const response = await api.post(API_URL, scamData);
    return response.data;
  } catch (error) {
    console.error('Error adding spotted scam:', error);
    throw error;
  }
};

export const deleteSpottedScam = async (id: string): Promise<void> => {
  try {
    await api.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting spotted scam:', error);
    throw error;
  }
};
