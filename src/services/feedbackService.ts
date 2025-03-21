import api from './api';
import { Feedback } from '../types/feedback';

const API_URL = '/feedback';

export const getFeedback = async (cardId: string): Promise<Feedback> => {
  try {
    const response = await api.get(`${API_URL}/${cardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};

export const upsertFeedback = async (cardId: string, feedback: string[]) => {
  try {
    const requestData = { cardId, feedback };
    const response = await api.put(API_URL, requestData);
    return response.data;
  } catch (error) {
    console.error('Error creating/updating feedback:', error);
    throw error;
  }
};
