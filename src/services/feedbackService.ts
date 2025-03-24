import api from './api';
import { Feedback } from '../types/feedback';

const API_URL = '/feedback';

// Fetch feedback, including score and testCompleted
export const getFeedback = async (cardId: string): Promise<Feedback> => {
  try {
    const response = await api.get(`${API_URL}/${cardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};

// Update feedback only
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

// Update score and testCompleted separately
export const updateTestResults = async (
  cardId: string,
  score: number,
  testCompleted: boolean
) => {
  try {
    const requestData = { cardId, score, testCompleted };
    const response = await api.put(`${API_URL}/test-results`, requestData);
    return response.data;
  } catch (error) {
    console.error('Error updating test results:', error);
    throw error;
  }
};

// Reset score and testCompleted
export const resetTest = async (cardId: string) => {
  try {
    const response = await api.post(`${API_URL}/reset`, { cardId });
    return response.data;
  } catch (error) {
    console.error('Error resetting test:', error);
    throw error;
  }
};
