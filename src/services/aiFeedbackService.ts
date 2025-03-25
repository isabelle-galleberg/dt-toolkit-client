import api from './api';

const API_URL = '/ai-feedback';

// Fetch AI feedback
export const getAiFeedback = async (cardId: string) => {
  try {
    const response = await api.get(`${API_URL}/${cardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};

// Update AI feedback
export const updateAiFeedback = async (
  cardId: string,
  strengths: string,
  improvements: string
) => {
  try {
    const requestData = { cardId, strengths, improvements };
    const response = await api.put(API_URL, requestData);
    return response.data;
  } catch (error) {
    console.error('Error updating test results:', error);
    throw error;
  }
};
